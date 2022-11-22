import GlobalStyle from "./styles";
import { Container, FormLabel, IconButton } from "@mui/material";
import {
  SelectGroupField,
  SelectWeekField,
  SelectWeekdayField,
  SelectLessonForm,
} from "./components";
import { useForm, DefaultValues } from "react-hook-form";
import { FormControl, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import { FormValues } from "./types";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const defaultValues: DefaultValues<FormValues> = {
    group: {
      id: "",
      label: "",
    },
    weeks: [],
    weekday: "",
    professorsAndAuditories: [{}],
    subject: "",
    start: new Date(),
  };
  const {
    handleSubmit,
    control,
    getValues,
    reset,

    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(addCourseSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      const data = getValues();
      enqueueSnackbar(
        `Пара ${data.subject} добавлена для группы ${data.group.label} на ${
          data.weekday.slice(0, -1) + "у"
        } для ${data.weeks.length > 1 ? "недель" : "недели"} `,
        {
          action: (snackbarId) => (
            <IconButton
              onClick={() => closeSnackbar(snackbarId)}
              color="primary"
            >
              <CloseIcon />
            </IconButton>
          ),
        }
      );
      reset();
    }
  }, [isSubmitSuccessful, closeSnackbar, enqueueSnackbar, getValues, reset]);
  const onSubmit = handleSubmit(async (data) => {
    const groupRef = collection(db, "schedule");
    const groupQuery = query(groupRef, where("id", "==", `${data.group.id}`));

    const isScheduleExists = !(await getDocs(groupQuery)).empty;
    try {
      // Если для группы с определенным АЙДИ не добавлено расписание (!isScheduleExists), мы создаем новый документ с помощью addDocs. В ином случае, берем путь для расписания из query
      if (isScheduleExists) {
        const groupQueryID = (await getDocs(groupQuery)).docs[0].id;
        data.weeks.forEach((week) => {
          const ref = collection(
            db,
            `${groupRef.path}/${groupQueryID}/week_${week}`
          );

          addDoc(ref, {
            subject: data.subject,
            weekday: data.weekday,
          });
        });
        console.log("exists");
      } else {
        addDoc(groupRef, {
          id: data.group.id,
          group: data.group.label,
        }).then(({ path }) => {
          data.weeks.forEach((week) => {
            const ref = collection(db, `${path}/week_${week}`);
            addDoc(ref, {
              subject: data.subject,
              weekday: data.weekday,
            });
          });
        });
      }
    } catch (error) {
      enqueueSnackbar("Произошла ошибка! Попробуйте еще раз...");
      console.log(error);
    }
  });
  return (
    <Container>
      <GlobalStyle />
      <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
        <FormLabel sx={{ mb: 3 }}>
          Заполните поля ниже, чтобы добавить новую пару
        </FormLabel>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <SelectGroupField control={control} />
          <SelectWeekField control={control} />
          <SelectWeekdayField control={control} />
          <SelectLessonForm control={control} />
        </Stack>

        <LoadingButton
          type="submit"
          loading={isSubmitting}
          variant="contained"
          sx={{ maxWidth: "200px" }}
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          Добавить
        </LoadingButton>
      </FormControl>
    </Container>
  );
}

//  group: {
//       id: "",
//       label: "",
//     },
//     weeks: [],
//     weekday: "",
//     professorsAndAuditories: [{}],
//     subject: "",
//     start: new Date(),

const addCourseSchema = yup.object({
  group: yup.object({
    id: yup.string(),
    label: yup.string().required(`Выберите группу`),
    weeks: yup
      .mixed()
      .when("isArray", {
        is: Array.isArray,
        then: yup.array().of(yup.string()),
        otherwise: yup.string(),
      })
      .required("Выберите недели"),
    subject: yup.string().required("Выберите предмет"),
    start: yup.date().required("Выбеите начало пары"),
  }),
});

export default App;

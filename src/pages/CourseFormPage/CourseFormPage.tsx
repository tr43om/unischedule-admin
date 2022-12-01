import React from "react";
import { Container, FormLabel, IconButton } from "@mui/material";
import {
  SelectGroupField,
  SelectWeekField,
  SelectWeekdayField,
  SelectLessonForm,
  ScheduleList,
} from "../../components";
import { useForm, DefaultValues, useWatch } from "react-hook-form";
import { FormControl, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Stack from "@mui/material/Stack";
import { CourseFormValues } from "../../types";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSnackbar } from "notistack";

const CourseFormPage = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const defaultValues: DefaultValues<CourseFormValues> = {
    group: {
      id: "",
      label: "",
    },
    weeks: [],
    weekday: "",
    professorsAndAuditories: [{}],
    subject: "",
    start: new Date(new Date().setHours(0, 0, 0, 0)),
  };
  const {
    handleSubmit,
    control,

    formState: { isSubmitting },
  } = useForm<CourseFormValues>({
    defaultValues,
    resolver: yupResolver(addCourseSchema),
  });

  const { group, weekday, weeks } = useWatch({ control });

  const isAddCourseFormVisible =
    group?.label && weekday && weekday.length !== 0;

  const addCourse = handleSubmit(async (data) => {
    const groupRef = doc(collection(db, "schedule"), data.group.id);
    const courseRef = (week: string) =>
      collection(db, `schedule/${data.group.id}/week_${week}`);
    const successMessage = `Пара ${data.subject} добавлена для группы ${
      data.group.label
    } на ${data.weekday.slice(0, -1) + "у"} для ${
      data.weeks.length > 1 ? "недель" : "недели"
    } `;

    try {
      await setDoc(groupRef, {
        id: data.group.id,
        group: data.group.label,
      });

      await data.weeks.forEach((week) =>
        addDoc(courseRef(week), {
          subject: data.subject,
          weekday: data.weekday,
        })
      );

      enqueueSnackbar(successMessage, {
        action: (snackbarId) => (
          <IconButton onClick={() => closeSnackbar(snackbarId)} color="primary">
            <CloseIcon />
          </IconButton>
        ),
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Произошла ошибка! Попробуйте еще раз...");
    }
  });
  return (
    <Container>
      <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
        <FormLabel sx={{ mb: 3 }}>
          Заполните поля ниже, чтобы добавить новую пару
        </FormLabel>
        <Stack spacing={3} sx={{ mb: 3 }}>
          <SelectGroupField control={control} />
          <SelectWeekField control={control} />
          <SelectWeekdayField control={control} />
          {isAddCourseFormVisible && <SelectLessonForm control={control} />}
          <ScheduleList control={control} />
        </Stack>

        <LoadingButton
          type="submit"
          loading={isSubmitting}
          variant="contained"
          sx={{ maxWidth: "200px" }}
          onClick={addCourse}
          disabled={isSubmitting}
        >
          Добавить
        </LoadingButton>
      </FormControl>
    </Container>
  );
};

const addCourseSchema = yup.object({
  group: yup
    .object()
    .shape({
      id: yup.string().min(1).required(),
      label: yup.string().min(1, "Выберите группу").required(),
    })
    .required(`Выберите группу`),
  professorsAndAuditories: yup
    .array()
    .of(
      yup.object().shape({
        auditory: yup.string().min(1, "Заполните номер аудитории"),
        professor: yup.string().min(1, "Выберите преподавателя"),
      })
    )
    .min(1, "Добавьте хотя бы одного преподавателя"),

  weeks: yup.array().min(1, "Выберите хотя бы одну неделю"),
  weekday: yup.string().required("Выберите день недели"),
  subject: yup.string().required("Выберите предмет"),
  start: yup
    .date()
    .typeError("Введеное время не корректно")
    .min(
      new Date(new Date().setHours(8, 45, 0, 0)),
      "Пара не может начаться раньше 8:45"
    )
    .required("Выберите начало пары"),
});

export default CourseFormPage;

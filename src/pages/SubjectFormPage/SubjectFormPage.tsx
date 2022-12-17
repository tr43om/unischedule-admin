import * as yup from "yup";

import React, { useMemo } from "react";
import { useForm, DefaultValues, Controller } from "react-hook-form";
import { SubjectFormValues, SubjectType } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFieldOfStudy, SubjectCard } from "../../components";
import { Button, Grid, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";

import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSnackbar } from "notistack";

import { useSelector } from "react-redux";
import { selectSubjects } from "../../store/ducks/schedule/selectors";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";

const SubjectFormPage = () => {
  const defaultValues: DefaultValues<SubjectFormValues> = {
    fieldOfStudy: {
      name: "",
    },
    subject: "",
  };
  const {
    handleSubmit,
    control,
    formState: { touchedFields },
    watch,
  } = useForm<SubjectFormValues>({
    defaultValues,

    resolver: yupResolver(addSubjectSchema),
    mode: "onChange",
  });

  const fieldOfStudyWatcher = watch("fieldOfStudy")?.abbr;
  const subjectValue = watch("subject").toLowerCase();

  const subjectsCollRef = collection(
    db,
    "subjects"
  ) as CollectionReference<SubjectType>;
  const subjectsQuery = query(
    subjectsCollRef,
    where("fieldOfStudy", "==", fieldOfStudyWatcher || "")
  );

  const [subjectsFromFirestore] = useCollection(subjectsQuery);

  const subjectsHits = useMemo(
    () =>
      subjectsFromFirestore?.docs
        .map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
        .filter(
          ({ subject, fieldOfStudy }) =>
            fieldOfStudy === fieldOfStudyWatcher &&
            subject.toLowerCase().includes(subjectValue)
        ),
    [fieldOfStudyWatcher, subjectValue, subjectsFromFirestore?.docs]
  );

  const { enqueueSnackbar } = useSnackbar();

  const addSubject = handleSubmit(
    async ({ fieldOfStudy: { abbr, faculty, name }, subject }) => {
      const subjectQuery = query(
        subjectsCollRef,
        where("fieldOfStudy", "==", abbr),
        where("subject", "==", subject)
      );

      const isSubjectExists = !(await getDocs(subjectQuery)).empty;

      if (isSubjectExists) {
        enqueueSnackbar(`Предмет "${subject}" уже добавлен в расписание!`, {
          variant: "error",
        });
      } else {
        await addDoc(subjectsCollRef, { faculty, subject, fieldOfStudy: abbr });

        enqueueSnackbar(
          `Предмет "${subject}" добавлен для  направления "${name}"`,
          {
            variant: "success",
          }
        );
      }
    }
  );

  const isHitsVisible = subjectValue.length >= 1;

  const isButtonDisabled = subjectsHits?.length !== 0 || subjectValue === "";

  return (
    <Stack gap={4}>
      <SelectFieldOfStudy control={control} />
      <Stack gap={2} flexDirection="row">
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <TextField
              {...field}
              disabled={fieldOfStudyWatcher === undefined}
              variant="outlined"
              placeholder="Название предмета..."
              size="medium"
              color="primary"
              fullWidth
            />
          )}
        />
        <Button
          type="submit"
          onClick={addSubject}
          variant="contained"
          disabled={isButtonDisabled}
        >
          Добавить
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {isHitsVisible &&
          subjectsHits?.map((option, index) => (
            <Grid
              component="li"
              item
              xl={6}
              sx={{ listStyle: "none", maxWidth: "300px" }}
              onClick={() => console.log(option)}
            >
              <SubjectCard index={index} option={option} />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
};

const addSubjectSchema = yup.object({});

export default SubjectFormPage;

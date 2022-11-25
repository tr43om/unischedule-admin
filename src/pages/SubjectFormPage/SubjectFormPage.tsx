import React from "react";

import { useForm, DefaultValues, Controller } from "react-hook-form";
import { SubjectFormValues } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFieldOfStudy, SelectSubjectField } from "../../components";
import * as yup from "yup";
import { Box, Button, FormControl, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { FieldOfStudy } from "../../types";
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
import { useCollectionData } from "react-firebase-hooks/firestore";
import { SubjectType } from "../../types";
import Typography from "@mui/material/Typography";

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
    getValues,
    reset,
    resetField,
    formState: { touchedFields },
    getFieldState,
    trigger,
    watch,
  } = useForm<SubjectFormValues>({
    defaultValues,
    resolver: yupResolver(addSubjectSchema),
    mode: "onChange",
  });

  const fieldOfStudyWatcher = watch("fieldOfStudy")?.abbr;

  console.log(fieldOfStudyWatcher);

  const subjectsCollRef = collection(
    db,
    "subjects"
  ) as CollectionReference<SubjectType>;
  const [subjects] = useCollectionData<SubjectType>(
    query(
      subjectsCollRef,
      where("fieldOfStudy", "==", fieldOfStudyWatcher || "")
    )
  );

  // console.log(subjects);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(touchedFields);
  }, [touchedFields]);

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
        resetField("subject");
      }
    }
  );
  return (
    <Stack gap={4}>
      <SelectFieldOfStudy control={control} />
      <Stack flexDirection="row" gap={2}>
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <TextField {...field} label="Введите название предмета" />
          )}
        />
        <Button type="submit" onClick={addSubject} variant="contained">
          Добавить новый предмет
        </Button>
      </Stack>
      {subjects?.length !== 0 && (
        <Stack>
          {subjects?.map((subj) => (
            <Typography key={subj.subject}>{subj.subject}</Typography>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

const addSubjectSchema = yup.object({});

export default SubjectFormPage;

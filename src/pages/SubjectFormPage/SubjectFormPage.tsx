import React, { useMemo } from "react";

import { useForm, DefaultValues, Controller } from "react-hook-form";
import { SubjectFormValues } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SelectFieldOfStudy,
  SelectSubjectField,
  SubjectCard,
} from "../../components";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  List,
  TextField,
  useAutocomplete,
} from "@mui/material";
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
import { useSelector } from "react-redux";
import { selectSubjects } from "../../store/ducks/schedule/selectors";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { searchClient } from "../../ms.config";
import Input from "@mui/material/Input";

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

  const subjects = useSelector(selectSubjects);

  const subjectsCollRef = collection(db, "subjects");

  const subjectsOfFOF = useMemo(
    () =>
      subjects.filter(
        (subject) => subject.fieldOfStudy === fieldOfStudyWatcher
      ),
    [subjects, fieldOfStudyWatcher]
  );

  // console.log(subjects);

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
        resetField("subject");
      }
    }
  );

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-subjects",
    options: subjectsOfFOF,
    getOptionLabel: (option) => option.subject,
  });

  const isHitsVisible =
    getInputProps() && (getInputProps().value as string).length >= 1;

  const isButtonDisabled =
    (getInputProps().value as string).length <= 1 ||
    groupedOptions.length !== 0;

  console.log(fieldOfStudyWatcher);

  return (
    <Stack gap={4}>
      <SelectFieldOfStudy control={control} />

      <Stack {...getRootProps()} flexDirection="row" gap={2}>
        <Controller
          control={control}
          name="subject"
          render={({ field }) => (
            <TextField
              {...field}
              {...getInputProps()}
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

      <Box
        component="ul"
        sx={{ flexGrow: 1, background: "red", height: "100vh" }}
        {...getListboxProps()}
      >
        <Grid container spacing={3}>
          {isHitsVisible &&
            (groupedOptions as typeof subjectsOfFOF).map((option, index) => (
              <Grid
                component="li"
                item
                xl={6}
                md={6}
                sm={12}
                sx={{ listStyle: "none", maxWidth: "300px" }}
                {...getOptionProps({ option, index })}
                onClick={() => console.log(option)}
              >
                <SubjectCard index={index} option={option} />
                {/* {option.subject} */}
              </Grid>
            ))}
        </Grid>
      </Box>
    </Stack>
  );
};

const addSubjectSchema = yup.object({});

export default SubjectFormPage;

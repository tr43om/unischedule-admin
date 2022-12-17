import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Controller,
  useController,
  FieldValues,
  UseControllerProps,
  useWatch,
} from "react-hook-form";
import { selectSubjects } from "../../store";
import { CourseFormValues, SubjectType } from "../../types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase.config";
import {
  collection,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";

const SelectSubjectField = <TFormValues extends FieldValues>({
  control,
  name,
}: SelectSubjectFieldProps<CourseFormValues>) => {
  // const subjects = useSelector(selectSubjects);
  const { group } = useWatch({ control });

  const fof = group?.label?.split("-")[0];

  const subjectsRef = collection(
    db,
    "subjects"
  ) as CollectionReference<SubjectType>;
  const subjectsQuery = query(subjectsRef, where("fieldOfStudy", "==", fof));
  const [subjects] = useCollectionData(subjectsQuery);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <InputLabel id="subject-select">Предмет</InputLabel>

          <Select
            id="subject-select"
            label="Предмет"
            sx={{ minWidth: 150 }}
            // value={field.value}
            {...field}
          >
            {subjects &&
              subjects.map(({ subject }, i) => {
                return (
                  <MenuItem key={i} value={subject}>
                    <ListItemText primary={subject} />
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

interface SelectSubjectFieldProps<TFormValues extends FieldValues>
  extends UseControllerProps<TFormValues> {}

export default SelectSubjectField;

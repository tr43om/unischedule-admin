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
import { CourseFormValues } from "../../types";

const SelectSubjectField = <TFormValues extends FieldValues>({
  control,
  name,
}: SelectSubjectFieldProps<CourseFormValues>) => {
  const subjects = useSelector(selectSubjects);
  const { group } = useWatch({ control });

  const fof = group?.label?.split("-")[0];

  const subjectsOfFOF = useMemo(
    () => subjects.filter((subject) => subject.fieldOfStudy === fof),
    [subjects, fof]
  );

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
            {...field}
          >
            {subjectsOfFOF &&
              subjectsOfFOF.map(({ subject }, i) => {
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

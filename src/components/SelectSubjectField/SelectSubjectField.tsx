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
} from "react-hook-form";
import { selectSubjects } from "../../store";

const SelectSubjectField = <TFormValues extends FieldValues>({
  control,
  name,
  fieldOfStudy,
}: SelectSubjectFieldProps<TFormValues>) => {
  const subjects = useSelector(selectSubjects);

  const subjectsOfFOF = useMemo(
    () => subjects.filter((subject) => subject.fieldOfStudy === fieldOfStudy),
    [subjects, fieldOfStudy]
  );

  const { formState } = useController({
    name,
    control,
  });

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
  extends UseControllerProps<TFormValues> {
  fieldOfStudy: string;
}

export default SelectSubjectField;

import React from "react";

import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectGroups } from "../../store/ducks/schedule/selectors";
import { CourseFormValues, FormFieldType } from "../../types";

const SelectGroupField = ({ control }: FormFieldType<CourseFormValues>) => {
  const groups = useSelector(selectGroups);

  return (
    <Controller
      name="group"
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: { errors },
      }) => (
        <Autocomplete
          disablePortal
          id="select-group-box"
          options={groups}
          onChange={(e, data) => onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Группа"
              variant="outlined"
              fullWidth
              value={value}
              error={!!error}
              helperText={error ? errors.group?.label?.message : ""}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
      )}
    />
  );
};

export default SelectGroupField;

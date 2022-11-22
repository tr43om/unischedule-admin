import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller, Control } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectGroups } from "../../store/ducks/schedule/selectors";
import { FormValues } from "../../types";
import { ErrorMessage } from "@hookform/error-message";

type SelectGroupFieldProps = {
  control: Control<FormValues>;
};

const SelectGroupField = ({ control }: SelectGroupFieldProps) => {
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
          id="combo-box"
          options={groups}
          onChange={(e, data) => onChange(data)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Группа"
              variant="filled"
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

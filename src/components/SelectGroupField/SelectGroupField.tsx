import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller, Control, useController } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectGroups } from "../../store/ducks/schedule/selectors";
import { useAppDispatch } from "../../store";
import { setGroupID } from "../../store/ducks/schedule";
import { FormValues, SelectType } from "../../types";

type SelectGroupFieldProps = {
  control: Control<FormValues>;
};

const options = [
  { label: "The Godfather", id: 1 },
  { label: "Pulp Fiction", id: 2 },
];

const SelectGroupField = ({ control }: SelectGroupFieldProps) => {
  const groups = useSelector(selectGroups);
  const dispatch = useAppDispatch();

  return (
    <Controller
      name="group"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          disablePortal
          id="combo-box"
          options={groups}
          onChange={(e, data) => onChange(data)}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите группу"
              variant="filled"
              value={value}
              error={!!error}
              helperText={error ? error.message : ""}
              onChange={(e) => onChange(e.target.value)}
            />
          )}
        />
      )}
    />
  );
};

export default SelectGroupField;

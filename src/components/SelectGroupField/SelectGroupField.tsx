import React from "react";

import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  selectGroups,
  currentGroupSelector,
} from "../../store/ducks/schedule/selectors";
import { selectCurrentGroup } from "../../store";
import { useAppDispatch } from "../../store";
import { CourseFormValues, FormFieldType, SelectType } from "../../types";

const SelectGroupField = ({ control }: FormFieldType<CourseFormValues>) => {
  const groups = useSelector(selectGroups);
  const dispatch = useAppDispatch();
  const currentGroup = useSelector(currentGroupSelector);

  if (!groups) {
    return <div>loading...</div>;
  }

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
          value={currentGroup || ""}
          onChange={(e, data) => {
            if (!data) return;
            onChange(data);
            dispatch(selectCurrentGroup(data || ({} as SelectType)));
          }}
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

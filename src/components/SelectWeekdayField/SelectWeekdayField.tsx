import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { FormValues } from "../../types";
import { Control, Controller } from "react-hook-form";
import { weekdays } from "../../constants";

type SelectWeekdayFieldProps = {
  control: Control<FormValues>;
};

const SelectWeekdayField = ({ control }: SelectWeekdayFieldProps) => {
  return (
    <Controller
      name="weekday"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <InputLabel id="weekday-select">День недели</InputLabel>

          <Select
            value={value}
            onChange={(event: SelectChangeEvent<string>) =>
              onChange(event.target.value)
            }
            label="День недели"
            placeholder="День недели"
            labelId="weekday-select"
            error={!!error}
          >
            {weekdays.map((weekday, i) => (
              <MenuItem key={i} value={weekday}>
                {weekday}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default SelectWeekdayField;

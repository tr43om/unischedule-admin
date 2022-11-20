import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";
import { FormControl } from "@mui/material";
import { selectWeekday, setWeekday, useAppDispatch } from "../../store";
import InputLabel from "@mui/material/InputLabel";
import { FormValues } from "../../types";
import { Control, Controller } from "react-hook-form";
import { weekdays } from "../../constants";

type SelectWeekdayFieldProps = {
  control: Control<FormValues>;
};

const SelectWeekdayField = ({ control }: SelectWeekdayFieldProps) => {
  const weekday = useSelector(selectWeekday);
  const dispatch = useAppDispatch();

  const onWeekSelect = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    dispatch(setWeekday(value));
  };
  return (
    <FormControl>
      <InputLabel id="weekday-select">День недели</InputLabel>
      <Controller
        name="weekday"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={(event: SelectChangeEvent<string>) =>
              onChange(event.target.value)
            }
            label="День недели"
            placeholder="День недели"
            labelId="weekday-select"
          >
            {weekdays.map((weekday, i) => (
              <MenuItem key={i} value={weekday}>
                {weekday}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default SelectWeekdayField;

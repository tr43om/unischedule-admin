import {
  FormControl,
  Checkbox,
  ListItemText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { FormValues } from "../../types";
import { Control, Controller } from "react-hook-form";
import { weeks, MenuProps } from "../../constants";

type SelectWeekFieldProps = {
  control: Control<FormValues>;
};

const SelectWeekField = ({ control }: SelectWeekFieldProps) => {
  return (
    <Controller
      name="weeks"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <InputLabel id="week-select">Неделя</InputLabel>
          <Select
            multiple
            id="week-select"
            onChange={(event: SelectChangeEvent<string[]>) =>
              onChange(event.target.value)
            }
            error={!!error}
            value={value}
            label="Неделя"
            renderValue={(selected) =>
              selected.map((week) => `${week} неделя`).join(", ")
            }
            MenuProps={MenuProps}
          >
            {weeks.map((i) => {
              return (
                <MenuItem key={i} value={i}>
                  <Checkbox checked={value.indexOf(i) > -1} />
                  <ListItemText primary={`${i} неделя`} />
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

export default SelectWeekField;

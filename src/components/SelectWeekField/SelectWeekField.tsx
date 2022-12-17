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
import { CourseFormValues, FormFieldType } from "../../types";
import { Controller } from "react-hook-form";
import { weeks, MenuProps } from "../../constants";
import { currentWeeksSelector, selectCurrentWeeks } from "../../store";
import { useAppDispatch } from "../../store";
import { useSelector } from "react-redux";

const SelectWeekField = ({ control }: FormFieldType<CourseFormValues>) => {
  const dispatch = useAppDispatch();
  const currentWeeks = useSelector(currentWeeksSelector);
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
            onChange={(event: SelectChangeEvent<typeof weeks>) => {
              onChange(event.target.value);
              dispatch(selectCurrentWeeks(event.target.value as string[]));
            }}
            error={!!error}
            value={currentWeeks || []}
            label="Неделя"
            renderValue={(selected) =>
              selected.map((week) => `${week} неделя`).join(", ")
            }
            MenuProps={MenuProps}
          >
            {weeks.map((i) => {
              return (
                <MenuItem key={i} value={i}>
                  <Checkbox checked={currentWeeks?.indexOf(i) > -1} />
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

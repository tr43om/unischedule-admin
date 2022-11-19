import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";
import { selectWeek, setWeek } from "../../store";
import { useAppDispatch } from "../../store";
import { FormControl, Checkbox, ListItemText } from "@mui/material";
import { MenuProps } from "../../constants";
import InputLabel from "@mui/material/InputLabel";

const SelectWeekField = () => {
  const week = useSelector(selectWeek);
  const weeks = Array(18)
    .fill("0")
    .map((_, i) => (i + 1).toString());
  const dispatch = useAppDispatch();

  const onWeekSelect = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    dispatch(setWeek(typeof value === "string" ? value.split(",") : value));
  };

  return (
    <FormControl>
      <InputLabel id="week-select">Недели</InputLabel>

      <Select
        multiple
        id="week-select"
        value={week || []}
        onChange={onWeekSelect}
        label="Недели"
        renderValue={(selected) =>
          selected.map((week) => `${week} неделя`).join(", ")
        }
        MenuProps={MenuProps}
      >
        {weeks.map((i) => {
          return (
            <MenuItem key={i} value={i}>
              <Checkbox checked={week.indexOf(i) > -1} />
              <ListItemText primary={`${i} неделя`} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectWeekField;

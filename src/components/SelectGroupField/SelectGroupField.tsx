import { Autocomplete, FormControl, TextField } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectGroups } from "../../store/ducks/schedule/selectors";
import { useAppDispatch } from "../../store";
import { setGroupID } from "../../store/ducks/schedule";

const SelectGroupField = () => {
  const groups = useSelector(selectGroups);
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      groupID: "",
    },
    mode: "onChange",
  });
  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={groups}
      onChange={(_, value) => dispatch(setGroupID(value))}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <Controller
          name="groupID"
          control={control}
          defaultValue=""
          rules={{ required: "Необходимо выбрать группу!" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              {...params}
              label="Выберите группу"
              variant="filled"
              value={value}
              error={!!error}
              helperText={error ? error.message : ""}
              onChange={onChange}
            />
          )}
        />
      )}
    />
  );
};

export default SelectGroupField;

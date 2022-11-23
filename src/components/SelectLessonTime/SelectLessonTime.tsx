import React from "react";

// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import ru from "date-fns/esm/locale/ru/index.js";
import { Stack } from "@mui/system";
import { CourseFormValues, FormFieldType } from "../../types";
import { Control, Controller } from "react-hook-form";
import format from "date-fns/format";
import addMinutes from "date-fns/addMinutes";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import isValid from "date-fns/isValid";
import FormControl from "@mui/material/FormControl/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const SelectLessonTime = ({ control }: FormFieldType<CourseFormValues>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <Controller
        control={control}
        name="start"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <DesktopTimePicker
              label="Начало пары"
              value={value}
              onChange={(date) => {
                onChange(date);
                // if (isValid(date)) {
                //   const formatedStartDate = format(date as Date, "p", {
                //     locale: ru,
                //   });
                //   const formatedEndDate = format(
                //     addMinutes(date as Date, 90),
                //     "p",
                //     { locale: ru }
                //   );

                //   console.log(formatedEndDate);

                //   onChange(formatedStartDate);
                // } else {
                //   onChange(date);
                // }
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <FormHelperText error={!!error}>{error?.message}</FormHelperText>
          </FormControl>
        )}
      />
    </LocalizationProvider>
  );
};

export default SelectLessonTime;

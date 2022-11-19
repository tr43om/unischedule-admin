import React, { useState } from "react";

// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField } from "@mui/material";
import ru from "date-fns/esm/locale/ru/index.js";
import { Stack } from "@mui/system";

const SelectLessonTime = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const [value2, setValue2] = useState<Date | null>(new Date());

  console.log(value);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <Stack flexDirection="row" gap={3}>
          <TimePicker
            label="Начало"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Конец"
            value={value2}
            onChange={(newValue) => {
              setValue2(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
};

export default SelectLessonTime;

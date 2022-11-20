import React from "react";
import Paper from "@mui/material/Paper";
import { SelectSubjectField } from "../SelectSubjectField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import { Control } from "react-hook-form";
import { SelectLessonTime } from "../SelectLessonTime";
import { SelectProfessorField } from "../SelectProfessorField";
import { FormValues } from "../../types";

type SelectLessonFieldProps = {
  control: Control<FormValues>;
};

const SelectLessonForm = ({ control }: SelectLessonFieldProps) => {
  return (
    <Box>
      <Typography>Добавить новую пару</Typography>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Stack gap={4}>
          <Stack flexDirection="row" gap={4}>
            <SelectSubjectField control={control} />
            <SelectLessonTime control={control} />
          </Stack>
          <SelectProfessorField control={control} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default SelectLessonForm;

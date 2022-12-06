import React from "react";
import Paper from "@mui/material/Paper";
import { SelectSubjectField } from "../SelectSubjectField";
import { Stack, Box, FormLabel, Typography } from "@mui/material";
import { SelectLessonTime } from "../SelectLessonTime";
import { SelectProfessorField } from "../SelectProfessorField";
import { CourseFormValues, FormFieldType } from "../../types";

const SelectLessonForm = ({ control }: FormFieldType<CourseFormValues>) => {
  return (
    <Box>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Stack gap={4}>
          <Stack gap={4}>
            <SelectSubjectField control={control} name="subject" />
            <SelectLessonTime control={control} />
          </Stack>
          <SelectProfessorField control={control} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default SelectLessonForm;

import React from "react";
import Paper from "@mui/material/Paper";
import { SelectSubjectField } from "../SelectSubjectField";
import { Stack, Box } from "@mui/material";
import { SelectLessonTime } from "../SelectLessonTime";
import { SelectProfessorField } from "../SelectProfessorField";
import { CourseFormValues, FormFieldType } from "../../types";
import { useController } from "react-hook-form";

const SelectLessonForm = ({ control }: FormFieldType<CourseFormValues>) => {
  const {
    field: { value },
  } = useController({
    control,
    name: "group",
  });

  return (
    <Box>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Stack gap={4}>
          <Stack flexDirection="row" gap={4}>
            <SelectSubjectField
              control={control}
              name="subject"
              fieldOfStudy={value.label && value.label.split("-")[0]}
            />
            <SelectLessonTime control={control} />
          </Stack>
          <SelectProfessorField control={control} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default SelectLessonForm;

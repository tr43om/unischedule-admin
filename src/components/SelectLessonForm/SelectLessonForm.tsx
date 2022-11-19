import React from "react";
import Paper from "@mui/material/Paper";
import { SelectSubjectField } from "../SelectSubjectField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  IconButton,
  Stack,
  Typography,
  Box,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInput } from "../FormInput";
import { useSelector } from "react-redux";
import { selectSelectedSubject } from "../../store";
import { SelectLessonTime } from "../SelectLessonTime";
import { SelectProfessorField } from "../SelectProfessorField";
import { AuditoryFields } from "../AuditoryFields";

const SelectLessonForm = () => {
  return (
    <Box>
      <Typography>Добавить новую пару</Typography>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Stack gap={4}>
          <Stack flexDirection="row" gap={4}>
            <SelectSubjectField />
            <SelectProfessorField />
          </Stack>
          <AuditoryFields />
          <SelectLessonTime />
          <IconButton size="large">
            <AddBoxIcon />
          </IconButton>
        </Stack>
      </Paper>
    </Box>
  );
};

export default SelectLessonForm;

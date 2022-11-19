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

const SelectLessonForm = () => {
  const { professors } = useSelector(selectSelectedSubject);
  const {
    handleSubmit,
    control,
    formState: { isSubmitSuccessful },
  } = useForm<{ auditory: string }>({
    defaultValues: {
      auditory: "",
    },

    mode: "onChange",
  });
  return (
    <Box>
      <Typography>Добавить новую пару</Typography>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Stack flexDirection="row" justifyItems="center" alignItems="center">
          <SelectSubjectField />
          <TableContainer component={Stack} sx={{ maxWidth: 300 }}>
            <Table size="small">
              <TableBody>
                {professors &&
                  professors.map((professor) => (
                    <TableRow key={professor}>
                      <TableCell align="left">{professor} </TableCell>
                      <TableCell align="left">
                        <FormInput
                          name="auditory"
                          control={control}
                          placeholder="Кабинет"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

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

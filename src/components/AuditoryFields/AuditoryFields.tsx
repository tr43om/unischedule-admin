import React from "react";
import {
  Stack,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectSelectedProfessors } from "../../store";
import { FormInput } from "../FormInput";
import { useForm } from "react-hook-form";

type AuditoryAndProfessorType = {
  professor: string;
  auditory: string;
};

const AuditoryFields = () => {
  const professors = useSelector(selectSelectedProfessors);
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { isSubmitSuccessful },
  } = useForm<{ auditory: AuditoryAndProfessorType[] }>({
    defaultValues: {},
  });

  console.log(getValues);
  return (
    <TableContainer component={Stack} sx={{ maxWidth: 300 }}>
      <Table size="small">
        <TableBody>
          {professors &&
            professors.map((professor, i) => (
              <TableRow key={professor.id}>
                <TableCell align="left">{professor.name} </TableCell>
                <TableCell align="left">
                  <FormInput
                    name={`auditory${i}`}
                    control={control}
                    placeholder="Кабинет"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditoryFields;

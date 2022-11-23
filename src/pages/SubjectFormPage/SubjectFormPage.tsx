import React from "react";

import { useForm, DefaultValues, Controller } from "react-hook-form";
import { SubjectFormValues } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFieldOfStudy, SelectSubjectField } from "../../components";
import * as yup from "yup";
import { Box, Button, FormControl, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect } from "react";
import { FieldOfStudy } from "../../types";

const SubjectFormPage = () => {
  const defaultValues: DefaultValues<SubjectFormValues> = {
    fieldOfStudy: {
      name: "",
    },
    subject: "",
  };

  const {
    handleSubmit,
    control,
    getValues,
    reset,

    formState: { touchedFields },
    getFieldState,
  } = useForm<SubjectFormValues>({
    defaultValues,
    resolver: yupResolver(addSubjectSchema),
    mode: "onChange",
  });

  const addSubject = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <Stack gap={4}>
      <SelectFieldOfStudy control={control} />
      <Controller
        control={control}
        name="subject"
        render={({ field }) => (
          <TextField {...field} label="Введите название предмета" />
        )}
      />
      <Button type="submit" onClick={addSubject}>
        Добавить предмет
      </Button>
    </Stack>
  );
};

const addSubjectSchema = yup.object({});
export default SubjectFormPage;

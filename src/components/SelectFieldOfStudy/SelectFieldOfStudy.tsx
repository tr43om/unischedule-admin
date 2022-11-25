import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, CollectionReference } from "firebase/firestore";
import { db } from "../../firebase.config";
import { FieldOfStudy, SubjectFormValues } from "../../types";
import { Controller, useController, useFormState } from "react-hook-form";

import { TextField, Autocomplete } from "@mui/material";
import { FormFieldType } from "../../types";

const SelectFieldOfStudy = ({ control }: FormFieldType<SubjectFormValues>) => {
  const fieldsOfStudyRef = collection(
    db,
    "fieldsOfStudy"
  ) as CollectionReference<FieldOfStudy>;
  const [fieldsOfStudy] = useCollectionData(fieldsOfStudyRef);
  const {
    field,
    fieldState: {},
    formState: {},
  } = useController({
    control,
    name: "fieldOfStudy",
  });

  return (
    <Controller
      name="fieldOfStudy"
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState: { errors },
      }) => (
        <Autocomplete
          disablePortal
          freeSolo={true}
          id="select-fieldOfStudy"
          groupBy={(option) => option.faculty}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          value={value}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onChange={(_, data) => onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите направление"
              error={!!error}
              helperText={error ? errors.fieldOfStudy?.message : ""}
            />
          )}
          options={fieldsOfStudy || []}
        />
      )}
    />
  );
};

export default SelectFieldOfStudy;

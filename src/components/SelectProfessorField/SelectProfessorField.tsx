import React, { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Box,
  Button,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { setProfessors, useAppDispatch } from "../../store";

import {
  collection,
  where,
  query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { FormValues, ProfessorType } from "../../types";
import { MenuProps } from "../../constants";
import {
  Control,
  Controller,
  useFieldArray,
  useController,
} from "react-hook-form";
import { FormInput } from "../FormInput";
import { ErrorMessage } from "@hookform/error-message";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

const SelectProfessorField = ({ control }: SelectProfessorFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "professorsAndAuditories",
  });

  const {
    formState: { errors },
  } = useController({
    control,
    name: "professorsAndAuditories",
  });

  const dispatch = useAppDispatch();

  const ref = collection(
    db,
    "professors"
  ) as CollectionReference<ProfessorType>;
  const q = query(ref, where("faculties", "array-contains", "ЯПБ"));
  const [professorsFromFirestore] = useCollectionData(q);

  useEffect(() => {
    dispatch(setProfessors(professorsFromFirestore || []));
  }, [professorsFromFirestore, dispatch]);

  return (
    <Box>
      <Stack gap={2}>
        {fields.map((_, number) => (
          <Stack flexDirection="row" gap={1}>
            <FormControl>
              <InputLabel id="professor-select">Преподаватель</InputLabel>
              <Stack flexDirection="row" gap={3}>
                <Controller
                  name={`professorsAndAuditories.${number}.professor`}
                  control={control}
                  render={({ field, formState: { errors } }) => (
                    <FormControl
                      error={
                        !!errors?.professorsAndAuditories?.[number]?.professor
                      }
                    >
                      <Select
                        id="professor-select"
                        label="Преподаватель"
                        sx={{ minWidth: 150 }}
                        MenuProps={MenuProps}
                        error={
                          !!errors?.professorsAndAuditories?.[number]?.professor
                        }
                        {...field}
                      >
                        {professorsFromFirestore &&
                          professorsFromFirestore.map(({ id, name }, i) => {
                            return (
                              <MenuItem key={i} value={id}>
                                <ListItemText primary={name} />
                              </MenuItem>
                            );
                          })}
                      </Select>
                      <FormHelperText
                        error={
                          !!errors?.professorsAndAuditories?.[number]?.professor
                        }
                      >
                        {
                          errors?.professorsAndAuditories?.[number]?.professor
                            ?.message
                        }
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name={`professorsAndAuditories.${number}.auditory`}
                  render={({
                    field,

                    formState: { errors },
                  }) => (
                    <FormControl>
                      <TextField
                        placeholder="Номер аудитории"
                        {...field}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">№</InputAdornment>
                          ),
                        }}
                      />
                      <FormHelperText
                        error={
                          !!errors?.professorsAndAuditories?.[number]?.auditory
                        }
                      >
                        {
                          errors?.professorsAndAuditories?.[number]?.auditory
                            ?.message
                        }
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Stack>
            </FormControl>

            <IconButton size="large" onClick={() => remove(number)}>
              <ClearIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <Button
        onClick={() => append({ auditory: "", professor: "" })}
        sx={{ mt: 3 }}
      >
        Добавить преподавателя
      </Button>
      <ErrorMessage
        errors={errors}
        name="professorsAndAuditories"
        render={({ message }) => (
          <Typography variant="body2" color="red">
            {message}
          </Typography>
        )}
      />
    </Box>
  );
};

type SelectProfessorFieldProps = {
  control?: Control<FormValues>;
};

export default SelectProfessorField;

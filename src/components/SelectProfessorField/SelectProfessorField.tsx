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
import { Control, Controller, useFieldArray } from "react-hook-form";
import { FormInput } from "../FormInput";

const SelectProfessorField = ({ control }: SelectProfessorFieldProps) => {
  const { fields, append, remove } = useFieldArray({
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
      <Stack gap={3}>
        {fields.map((_, number) => (
          <Stack flexDirection="row" gap={3}>
            <FormControl>
              <InputLabel id="professor-select">Преподаватель</InputLabel>
              <Controller
                name={`professorsAndAuditories.${number}.professor`}
                control={control}
                render={({ field, fieldState, formState }) => (
                  <Select
                    id="professor-select"
                    label="Преподаватель"
                    sx={{ minWidth: 150 }}
                    MenuProps={MenuProps}
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
                )}
              />
            </FormControl>
            <FormInput
              control={control}
              name={`professorsAndAuditories.${number}.auditory`}
              placeholder="Аудитория №"
            />

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
    </Box>
  );
};

type SelectProfessorFieldProps = {
  control?: Control<FormValues>;
};

export default SelectProfessorField;

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
  AutocompleteCloseReason,
  Avatar,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { useAppDispatch } from "../../store";

import {
  collection,
  where,
  query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useCollectionData } from "react-firebase-hooks/firestore";

import {
  CourseFormValues,
  ProfessorResponseType,
  FormFieldType,
  ProfessorsAndAuditoriesType,
} from "../../types";
import { MenuProps } from "../../constants";
import { Controller, useFieldArray, useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import { Autocomplete } from "@mui/material";

const SelectProfessorField = ({ control }: FormFieldType<CourseFormValues>) => {
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

  const ref = collection(
    db,
    "professors"
  ) as CollectionReference<ProfessorResponseType>;

  const [professorsFromFirestore] = useCollectionData(ref);

  return (
    <Box>
      <Stack gap={2}>
        {fields.map((_, number) => (
          <Stack flexDirection="row" gap={1}>
            <FormControl>
              <Stack gap={3}>
                <Controller
                  name={`professorsAndAuditories.${number}.professor`}
                  control={control}
                  render={({
                    field: { value, onChange },
                    formState: { errors },
                  }) => (
                    <FormControl
                      error={
                        !!errors?.professorsAndAuditories?.[number]?.professor
                      }
                    >
                      <Autocomplete
                        disablePortal
                        freeSolo={true}
                        id="select-professor-box"
                        options={professorsFromFirestore || []}
                        value={value}
                        onChange={(e, data) => onChange(data)}
                        getOptionLabel={(option) =>
                          typeof option === "string" ? option : option.fullname
                        }
                        noOptionsText="No labels"
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Stack
                              flexDirection="row"
                              gap={1}
                              alignItems="center"
                            >
                              <Avatar src={option.PFP_THUMBNAIL_URL}>
                                {option.firstname[0]}{" "}
                              </Avatar>
                              <Typography>{option.shortname}</Typography>
                            </Stack>
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Преподаватель"
                            variant="outlined"
                            fullWidth
                            value={value}
                            error={
                              !!errors?.professorsAndAuditories?.[number]
                                ?.professor
                            }
                            helperText={
                              errors?.professorsAndAuditories?.[number]
                                ?.professor?.message
                            }
                            onChange={(e) => onChange(e.target.value)}
                          />
                        )}
                      />
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
        onClick={() => append({} as ProfessorsAndAuditoriesType)}
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

export default SelectProfessorField;

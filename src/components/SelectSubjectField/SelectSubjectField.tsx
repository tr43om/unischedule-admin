import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

import {
  collection,
  where,
  query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase.config";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { SubjectType } from "../../types";
import {
  Control,
  Controller,
  useController,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

const SelectSubjectField = <TFormValues extends FieldValues>({
  control,
  name,
  fieldOfStudy,
}: SelectSubjectFieldProps<TFormValues>) => {
  const ref = collection(db, "subjects") as CollectionReference<SubjectType>;
  const q = query(ref, where("faculty", "==", fieldOfStudy));
  const [subjectsFromFirestore] = useCollectionData(q);

  const { formState } = useController({
    name,
    control,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error}>
          <InputLabel id="subject-select">Предмет</InputLabel>

          <Select
            id="subject-select"
            label="Предмет"
            sx={{ minWidth: 150 }}
            {...field}
          >
            {subjectsFromFirestore &&
              subjectsFromFirestore.map(({ subject }, i) => {
                return (
                  <MenuItem key={i} value={subject}>
                    <ListItemText primary={subject} />
                  </MenuItem>
                );
              })}
          </Select>
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

interface SelectSubjectFieldProps<TFormValues extends FieldValues>
  extends UseControllerProps<TFormValues> {
  fieldOfStudy: string;
}

export default SelectSubjectField;

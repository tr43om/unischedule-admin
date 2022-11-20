import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";

import {
  collection,
  where,
  query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { useAppDispatch, setSubjects } from "../../store";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { FormValues, SubjectType } from "../../types";
import { Control, Controller } from "react-hook-form";

const SelectSubjectField = ({ control }: SelectSubjectFieldProps) => {
  const dispatch = useAppDispatch();
  const ref = collection(db, "subjects") as CollectionReference<SubjectType>;
  const q = query(ref, where("faculty", "==", "ЯПБ"));
  const [subjectsFromFirestore] = useCollectionData(q);

  useEffect(() => {
    dispatch(setSubjects(subjectsFromFirestore || []));
  }, [subjectsFromFirestore, dispatch]);

  return (
    <FormControl>
      <InputLabel id="subject-select">Предмет</InputLabel>
      <Controller
        control={control}
        name="subject"
        render={({ field }) => (
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
        )}
      />
    </FormControl>
  );
};

type SelectSubjectFieldProps = {
  control?: Control<FormValues>;
};

export default SelectSubjectField;

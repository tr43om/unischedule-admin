import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectGroupID, selectSubjectID, setSubjects } from "../../store";
import {
  collection,
  where,
  query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { setSelectedSubjectID, useAppDispatch } from "../../store";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { SubjectType } from "../../types";

const SelectSubjectField = () => {
  const selectedSubjectID = useSelector(selectSubjectID);

  const dispatch = useAppDispatch();
  const ref = collection(db, "subjects") as CollectionReference<SubjectType>;
  const q = query(ref, where("faculty", "==", "ЯПБ"));
  const [subjectsFromFirestore] = useCollectionData(q);

  useEffect(() => {
    dispatch(setSubjects(subjectsFromFirestore || []));
  }, [subjectsFromFirestore, dispatch]);

  const onSubjectSelect = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    dispatch(setSelectedSubjectID(value));
  };

  return (
    <FormControl>
      <InputLabel id="subject-select">Предмет</InputLabel>
      <Select
        id="subject-select"
        label="Предмет"
        value={selectedSubjectID}
        onChange={onSubjectSelect}
        sx={{ minWidth: 150 }}
      >
        {subjectsFromFirestore &&
          subjectsFromFirestore.map((subject, i) => {
            return (
              <MenuItem key={i} value={subject.id}>
                <ListItemText primary={subject.subject} />
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectSubjectField;

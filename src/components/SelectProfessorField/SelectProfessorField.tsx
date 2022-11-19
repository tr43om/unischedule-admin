import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  setProfessors,
  setSelectedProfessorIDs,
  selectProfessorIDs,
  useAppDispatch,
} from "../../store";
import {
  collection,
  where,
  query,
  CollectionReference,
} from "firebase/firestore";
import { db } from "../../firebase.config";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { ProfessorType } from "../../types";
import { MenuProps } from "../../constants";

const SelectProfessorField = () => {
  const selectedProfessorIDs = useSelector(selectProfessorIDs);

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

  const onProfessorSelect = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    dispatch(
      setSelectedProfessorIDs(
        typeof value === "string" ? value.split(",") : value
      )
    );
  };

  return (
    <FormControl>
      <InputLabel id="professor-select">Преподаватели</InputLabel>
      <Select
        multiple
        id="professor-select"
        label="Преподаватели"
        value={selectedProfessorIDs}
        onChange={onProfessorSelect}
        sx={{ minWidth: 150 }}
        MenuProps={MenuProps}
        renderValue={(selected) =>
          selected
            .map(
              (id) =>
                professorsFromFirestore?.find(
                  (professor) => professor.id === id
                )?.name
            )
            .join(", ")
        }
      >
        {professorsFromFirestore &&
          professorsFromFirestore.map(({ id, name }, i) => {
            return (
              <MenuItem key={i} value={id}>
                <Checkbox checked={selectedProfessorIDs.indexOf(id) > -1} />

                <ListItemText primary={name} />
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectProfessorField;

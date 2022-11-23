import React from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, CollectionReference } from "firebase/firestore";
import { db } from "../../firebase.config";
import { FieldOfStudy } from "../../types";

import { Autocomplete } from "@mui/lab";

const SelectFieldOfStudy = () => {
  const fieldsOfStudyRef = collection(
    db,
    "fieldsOfStudy"
  ) as CollectionReference<FieldOfStudy>;
  const [fieldsOfStudy] = useCollectionData(fieldsOfStudyRef);

  return <div>SelectFieldOfStudy</div>;
};

export default SelectFieldOfStudy;

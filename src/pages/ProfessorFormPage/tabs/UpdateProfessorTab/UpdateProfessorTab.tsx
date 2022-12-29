import React, { useState, useMemo } from "react";

import { TextField, Grid } from "@mui/material";
import { Controller, DefaultValues } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useCollectionData,
  useCollection,
} from "react-firebase-hooks/firestore";
import { ProfessorResponseType } from "../../../../types";
import { collection, CollectionReference } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { UpdateCard } from "../../../../components/ui";
import { ProfessorCard } from "../../../../components";
import { useEffect } from "react";

const UpdateProfessorTab = () => {
  const [value, setValue] = useState("");
  const professorsRef = collection(
    db,
    "professors"
  ) as CollectionReference<ProfessorResponseType>;

  const [professorsFromFirestore] = useCollection(professorsRef);

  const professorsHits = useMemo(
    () =>
      professorsFromFirestore?.docs
        .map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        })
        .filter(({ fullname }) =>
          fullname.toLowerCase().trim().includes(value.toLowerCase().trim())
        ),
    [professorsFromFirestore, value]
  );

  const isHitsVisible =
    professorsFromFirestore && professorsHits; /*value.length >= 1 */

  return (
    <>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        placeholder="ФИО преподавателя..."
        size="medium"
        color="primary"
        fullWidth
      />

      <Grid container spacing={3} mt={3}>
        {isHitsVisible &&
          professorsHits.map((option, index) => (
            <Grid
              component="li"
              item
              xl={6}
              sx={{ listStyle: "none", maxWidth: "300px" }}
            >
              <ProfessorCard option={option} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default UpdateProfessorTab;

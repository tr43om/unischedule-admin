import React from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";
import { UpdatePFP } from "../UpdatePFP";
import { ProfessorResponseType } from "../../types";
import { getFirestoreStoragePath } from "../../utils/index";
import { useState } from "react";
import { EditingMode } from "../EditingMode";
import {
  updateDoc,
  doc,
  collection,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase.config";

type UpdateProfessorModalProps = {
  isOpened: boolean;
  professor: ProfessorResponseType;
  onClose: () => void;
};

type ProfessorDataRowProps = {
  thLabel: string;
  tdLabel: string;
  updateField: (value: string) => void;
};

const ProfessorDataRow = ({
  thLabel,
  tdLabel,
  updateField,
}: ProfessorDataRowProps) => {
  return (
    <TableRow key={tdLabel}>
      <TableCell component="th" scope="row">
        {thLabel}
      </TableCell>
      <TableCell align="right">
        <EditingMode handleUpdate={updateField}>{tdLabel}</EditingMode>
      </TableCell>
    </TableRow>
  );
};

const UpdateProfessorModal = ({
  isOpened,
  onClose,
  professor,
}: UpdateProfessorModalProps) => {
  const ref = doc(collection(db, "professors"), professor.documentID);
  const updateField = async (field: string, value: string) => {
    await updateDoc(ref, {
      [field]: value,
      shortname: `${field === "surname" ? value : professor.surname} ${
        field === "firstname" ? value[0] : professor.firstname[0]
      }.${field === "patronym" ? value[0] : professor.patronym[0]}.`,
      fullname: `${field === "surname" ? value : professor.surname} ${
        field === "firstname" ? value : professor.firstname
      } ${field === "patronym" ? value : professor.patronym}`,
    });
  };
  return (
    <Dialog open={isOpened} onClose={onClose} fullWidth>
      <DialogTitle>
        Редактировать данные
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "grid", justifyItems: "center" }}>
        <Box>
          <UpdatePFP
            documentID={professor.documentID}
            src={professor.PFP_THUMBNAIL_URL}
            pfpPath={getFirestoreStoragePath(professor.PFP_URL) as string}
            thumbnailPath={
              getFirestoreStoragePath(professor.PFP_THUMBNAIL_URL) as string
            }
          />
        </Box>

        <ProfessorTable>
          <TableBody>
            <ProfessorDataRow
              thLabel="Фамилия:"
              tdLabel={professor.surname}
              updateField={(value: string) => updateField("surname", value)}
            />
            <ProfessorDataRow
              thLabel="Имя:"
              tdLabel={professor.firstname}
              updateField={(value: string) => updateField("firstname", value)}
            />
            <ProfessorDataRow
              thLabel="Отчество:"
              tdLabel={professor.patronym}
              updateField={(value: string) => updateField("patronym", value)}
            />
          </TableBody>
        </ProfessorTable>
      </DialogContent>
    </Dialog>
  );
};

const ProfessorTable = styled(Table)({
  [`& .${tableCellClasses.root}`]: {
    borderBottom: "none",
  },
  maxWidth: 400,
});

export default UpdateProfessorModal;

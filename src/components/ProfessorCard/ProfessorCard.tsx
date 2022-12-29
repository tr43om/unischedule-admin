import React from "react";
import { ProfessorResponseType } from "../../types";

import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { useSnackbar } from "notistack";
import { UpdateCard } from "../ui";
import {
  Avatar,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Close as CloseIcon,
  PhotoCameraOutlined as PhotoIcon,
} from "@mui/icons-material";
import { UpdatePFP } from "../UpdatePFP";
import { UpdateProfessorModal } from "../UpdateProfessorModal";
import { ref, deleteObject as deleteFileFromStorage } from "@firebase/storage";
import { getFirestoreStoragePath } from "../../utils/index";

type ProfessorCardType = {
  option: ProfessorResponseType;
};

const ProfessorCard = ({ option }: ProfessorCardType) => {
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeUpdateModal = () => setIsUpdateModalOpened(false);

  const { enqueueSnackbar } = useSnackbar();

  const professorRef = doc(collection(db, "professors"), option.documentID);

  const deleteProfessor = async () => {
    setIsDeleting(true);
    const pfpFileRef = ref(storage, getFirestoreStoragePath(option.PFP_URL));
    const thumbnailFileRef = ref(
      storage,
      getFirestoreStoragePath(option.PFP_THUMBNAIL_URL)
    );

    setTimeout(() => console.log("loading"), 5000);

    await deleteFileFromStorage(pfpFileRef);
    await deleteFileFromStorage(thumbnailFileRef);

    await deleteDoc(professorRef);
    setIsDeleting(false);
    enqueueSnackbar(`Преподаватель ${option.shortname} был удалён`, {
      variant: "success",
    });
  };

  const updateProfessor = async (professor: string) =>
    await updateDoc(professorRef, { professor });

  return (
    <Box sx={{ cursor: "pointer" }}>
      <UpdateCard
        title={option.shortname}
        update={updateProfessor}
        deleteCard={deleteProfessor}
        avatar={
          <Avatar
            sx={{ width: 80, height: 80 }}
            src={option.PFP_THUMBNAIL_URL}
          />
        }
        isDisabled={true}
        edit={() => setIsUpdateModalOpened((prev) => !prev)}
      />

      <UpdateProfessorModal
        professor={option}
        isOpened={isUpdateModalOpened}
        onClose={closeUpdateModal}
      />
    </Box>
  );
};

export default ProfessorCard;

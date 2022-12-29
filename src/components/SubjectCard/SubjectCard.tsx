import React from "react";
import { SubjectType } from "../../types";

import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSnackbar } from "notistack";
import { UpdateCard } from "../ui";

type SubjectCardType = {
  option: SubjectType;
};

const SubjectCard = ({ option }: SubjectCardType) => {
  const { enqueueSnackbar } = useSnackbar();

  const subjectRef = doc(collection(db, "subjects"), option.id);

  const deleteSubject = async () => {
    await deleteDoc(subjectRef);
    enqueueSnackbar(`Предмет ${option.subject} был удалён`);
  };

  const updateSubject = async (subject: string) =>
    await updateDoc(subjectRef, { subject });

  return (
    <UpdateCard
      title={option.subject}
      update={updateSubject}
      deleteCard={deleteSubject}
    />
  );
};

export default SubjectCard;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDocs, CollectionReference } from "firebase/firestore";
import { db } from "../../../firebase.config";
import { SubjectType } from "../../../types";

export const fetchGroups = createAsyncThunk(
  "schedule/fetchGroups",
  async () => {
    const groupsRef = collection(db, "groups");

    const groupsDocs = await getDocs(groupsRef);

    const groups = groupsDocs.docs.map((doc) => {
      return { label: doc.data().name, id: doc.id };
    });
    return groups;
  }
);

export const fetchSubjects = createAsyncThunk(
  "schedule/fetchSubjects",
  async () => {
    const subjectsRef = collection(
      db,
      "subjects"
    ) as CollectionReference<SubjectType>;
    const subjectsDocs = await getDocs(subjectsRef);

    const subjects = subjectsDocs.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    console.log(subjects);
    return subjects;
  }
);

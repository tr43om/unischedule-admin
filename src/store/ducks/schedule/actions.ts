import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";

export const fetchGroups = createAsyncThunk(
  "schedule/fetchGroups",
  async () => {
    const scheduleRef = collection(db, "schedule");

    const groupsDocs = await getDocs(scheduleRef);

    const groups = groupsDocs.docs.map((doc) => {
      return { label: doc.data().name, id: doc.id };
    });
    return groups;
  }
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectType, SubjectType } from "../../../types";
import { fetchGroups } from "./actions";

type ScheduleSliceType = {
  groupID: string;
  groupName: string;
  groups: SelectType[];
  week: string[];
  weekday: string;
  selectedSubjectID: string;
  subjects: SubjectType[];
  selectedSubject: SubjectType;
};

const initialState: ScheduleSliceType = {
  groupID: "",
  groupName: "",
  groups: [],
  week: [],
  weekday: "",
  selectedSubjectID: "",
  subjects: [],
  selectedSubject: {
    id: "",
    professors: [],
    subject: "",
  },
};

export const { actions, reducer } = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setGroupID: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<SelectType | null>
    ) => {
      if (payload) {
        state.groupID = payload.id;
        state.groupName = payload.label;
      }
    },
    setGroups: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<SelectType[]>
    ) => {
      state.groups = payload;
    },
    setSelectedSubjectID: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<string>
    ) => {
      state.selectedSubjectID = payload;
      state.selectedSubject = state.subjects.find(
        (subj) => subj.id === payload
      ) as SubjectType;
    },
    setSubjects: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<SubjectType[]>
    ) => {
      state.subjects = payload;
    },
    setWeek: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<string[]>
    ) => {
      state.week = payload;
    },
    setWeekday: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<string>
    ) => {
      state.weekday = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.fulfilled, (state, { payload }) => {
      state.groups = payload;
    });
  },
});

export const {
  setGroupID,
  setGroups,
  setWeek,
  setWeekday,
  setSelectedSubjectID,
  setSubjects,
} = actions;

export const scheduleReducer = reducer;

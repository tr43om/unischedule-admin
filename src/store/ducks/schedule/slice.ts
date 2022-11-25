import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectType, SubjectType, ProfessorType } from "../../../types";
import { fetchGroups, fetchSubjects } from "./actions";
import { client } from "../../../ms.config";

type ScheduleSliceType = {
  groupID: string;
  groupName: string;
  groups: SelectType[];

  week: string[];
  weekday: string;

  selectedSubjectID: string;
  subjects: SubjectType[];
  selectedSubject: SubjectType;

  selectedProfessorIDs: string[];
  professors: ProfessorType[];
  selectedProfessors: ProfessorType[];
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
    faculty: "",
    fieldOfStudy: "",
    subject: "",
  },

  selectedProfessorIDs: [],
  professors: [],
  selectedProfessors: [],
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

    setSelectedProfessorIDs: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<string[]>
    ) => {
      state.selectedProfessorIDs = payload;

      const selectedProfessors = payload.map(
        (id) =>
          state.professors.find(
            (professor) => professor.id === id
          ) as ProfessorType
      );

      state.selectedProfessors = selectedProfessors;
    },
    setProfessors: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<ProfessorType[]>
    ) => {
      state.professors = payload;
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

    builder.addCase(fetchSubjects.fulfilled, (state, { payload }) => {
      state.subjects = payload || [];
      client.index("subjects").addDocuments(state.subjects); // add documents to meillisearch index
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

  setProfessors,
  setSelectedProfessorIDs,
} = actions;

export const scheduleReducer = reducer;

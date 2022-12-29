import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SelectType,
  SubjectType,
  ProfessorResponseType,
  ScheduleType,
} from "../../../types";
import { fetchGroups, fetchSubjects } from "./actions";

type ScheduleSliceType = {
  groups: SelectType[];

  currentGroup: SelectType;
  currentWeeks: string[];
  currentWeekday: string;

  subjects: SubjectType[];

  selectedProfessorIDs: string[];
  professors: ProfessorResponseType[];
  selectedProfessors: ProfessorResponseType[];

  currentSchedule: ScheduleType[];
};

export const { actions, reducer } = createSlice({
  name: "schedule",
  initialState: {} as ScheduleSliceType,
  reducers: {
    setCurrentSchedule: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<ScheduleType[]>
    ) => {
      state.currentSchedule = payload;
    },

    selectCurrentGroup: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<SelectType>
    ) => {
      state.currentGroup = payload;
    },

    selectCurrentWeeks: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<string[]>
    ) => {
      state.currentWeeks = payload;
    },

    selectCurrentWeekday: (
      state: ScheduleSliceType,
      { payload }: PayloadAction<string>
    ) => {
      state.currentWeekday = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGroups.fulfilled, (state, { payload }) => {
      state.groups = payload;
    });

    builder.addCase(fetchSubjects.fulfilled, (state, { payload }) => {
      state.subjects = payload || [];
    });
  },
});

export const {
  setCurrentSchedule,
  selectCurrentGroup,
  selectCurrentWeeks,
  selectCurrentWeekday,
} = actions;

export const scheduleReducer = reducer;

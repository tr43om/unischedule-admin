import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SelectType,
  SubjectType,
  ProfessorType,
  ScheduleType,
} from "../../../types";
import { fetchGroups, fetchSubjects } from "./actions";

type ScheduleSliceType = {
  groups: SelectType[];

  subjects: SubjectType[];

  selectedProfessorIDs: string[];
  professors: ProfessorType[];
  selectedProfessors: ProfessorType[];

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

export const { setProfessors, setSelectedProfessorIDs, setCurrentSchedule } =
  actions;

export const scheduleReducer = reducer;

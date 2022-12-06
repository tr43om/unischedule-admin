import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectGroups = createSelector(
  ({ schedule: { groups } }: RootState) => groups,
  (groups) => groups
);

export const selectCurrentSchedule = createSelector(
  ({ schedule: { currentSchedule } }: RootState) => currentSchedule,
  (currentSchedule) => currentSchedule
);

export const selectProfessors = createSelector(
  ({ schedule: { professors } }: RootState) => professors,
  (professors) => professors
);

export const selectSelectedProfessors = createSelector(
  ({ schedule: { selectedProfessors } }: RootState) => selectedProfessors,
  (selectedProfessors) => selectedProfessors
);

export const selectProfessorIDs = createSelector(
  ({ schedule: { selectedProfessorIDs } }: RootState) => selectedProfessorIDs,
  (selectedProfessorIDs) => selectedProfessorIDs
);

export const selectSubjects = createSelector(
  ({ schedule: { subjects } }: RootState) => subjects,
  (subjects) => subjects
);

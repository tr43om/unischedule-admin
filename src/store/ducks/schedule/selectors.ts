import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectGroups = createSelector(
  ({ schedule: { groups } }: RootState) => groups,
  (groups) => groups
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

export const selectSubjectID = createSelector(
  ({ schedule: { selectedSubjectID } }: RootState) => selectedSubjectID,
  (selectedSubjectID) => selectedSubjectID
);

export const selectSelectedSubject = createSelector(
  ({ schedule: { selectedSubject } }: RootState) => selectedSubject,
  (selectedSubject) => selectedSubject
);

export const selectSubjects = createSelector(
  ({ schedule: { subjects } }: RootState) => subjects,
  (subjects) => subjects
);

export const selectWeek = createSelector(
  ({ schedule: { week } }: RootState) => week,
  (week) => week
);

export const selectWeekday = createSelector(
  ({ schedule: { weekday } }: RootState) => weekday,
  (weekday) => weekday
);

export const selectGroupID = createSelector(
  ({ schedule: { groupID } }: RootState) => groupID,
  (groupID) => groupID
);

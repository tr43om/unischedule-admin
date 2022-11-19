import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const selectGroups = createSelector(
  ({ schedule: { groups } }: RootState) => groups,
  (groups) => groups
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
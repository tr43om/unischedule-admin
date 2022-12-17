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

export const selectSubjects = createSelector(
  ({ schedule: { subjects } }: RootState) => subjects,
  (subjects) => subjects
);

export const currentGroupSelector = createSelector(
  ({ schedule: { currentGroup } }: RootState) => currentGroup,
  (currentGroup) => currentGroup
);

export const currentWeeksSelector = createSelector(
  ({ schedule: { currentWeeks } }: RootState) => currentWeeks,
  (currentWeeks) => currentWeeks
);

export const currentWeekdaySelector = createSelector(
  ({ schedule: { currentWeekday } }: RootState) => currentWeekday,
  (currentWeekday) => currentWeekday
);

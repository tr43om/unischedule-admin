import { Control, FieldValues, UseControllerProps } from "react-hook-form";
import { Timestamp } from "@firebase/firestore";

export type SubjectType = {
  subject: string;
  fieldOfStudy: string;
  faculty: string;
  id?: string;
};

export type SelectType = {
  label: string;
  id: string;
};

export type ProfessorType = {
  name: string;
  faculties: string[];
  id: string;
};

export type ScheduleType = {
  weekday: string;
  professorsAndAuditories: {
    auditory: string;
    professor: {
      name: string;
      id: string;
    };
  }[];
  subject: string;
  lessonStarts: Timestamp;
  lessonEnds: Timestamp;
  id: string;
  week: string;
};
export type SubjectUpdateValues = {
  professorsAndAuditories: Array<{
    auditory: string;
    professor: {
      name: string;
      id: string;
    };
  }>;
  subject: string;
  start: Date;
};

export type CourseFormValues = {
  group: {
    id: string;
    label: string;
  };
  weeks: string[];
  weekday: string;
  professorsAndAuditories: Array<{
    auditory: string;
    professor: {
      name: string;
      id: string;
    };
  }>;
  subject: string;
  start: Date;
};

export type FieldOfStudy = {
  abbr: string;
  name: string;
  faculty: string;
};

export type SubjectFormValues = {
  subject: string;
  fieldOfStudy: FieldOfStudy;
};

export type ProfessorFormValues = {
  firstname: string;
  surname: string;
  patronym: string;
  picture: File;
};

export enum RoutesPaths {
  home = "/",
  course = "/addcourse",
  subject = "/addsubject",
  professor = "/addprofessor",
  scheduleDetails = "/addcourse/:id",
}

export type FormFieldType<T extends FieldValues> = {
  control?: Control<T>;
  name?: string;
  disabled?: boolean;
};

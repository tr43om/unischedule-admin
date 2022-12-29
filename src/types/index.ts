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

export type ProfessorsAndAuditoriesType = {
  auditory: string;
  professor: ProfessorResponseType;
};

export type ScheduleType = {
  weekday: string;
  professorsAndAuditories: ProfessorsAndAuditoriesType[];
  subject: string;
  lessonStarts: Timestamp;
  lessonEnds: Timestamp;
  id: string;
  week: string;
};
export type SubjectUpdateValues = {
  professorsAndAuditories: ProfessorsAndAuditoriesType[];
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
  professorsAndAuditories: ProfessorsAndAuditoriesType[];
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

export type ProfessorResponseType = {
  firstname: string;
  surname: string;
  patronym: string;
  PFP_URL: string;
  PFP_THUMBNAIL_URL: string;
  shortname: string;
  fullname: string;
  documentID: string;
};

export type ProfessorFormRequestType = {
  firstname: string;
  surname: string;
  patronym: string;
  PFP: File;
  PFPThumbnail: File;
  shortname: string;
  fullname: string;
};

export enum RoutesPaths {
  home = "/",
  course = "addcourse",
  subject = "addsubject",
  professor = "professor",
  scheduleDetails = "addcourse/:id",
  addProfessor = "addProfessor",
  updateProfessor = "updateProfessor",
}

export type FormFieldType<T extends FieldValues> = {
  control?: Control<T>;
  name?: string;
  disabled?: boolean;
};

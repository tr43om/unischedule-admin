export type SubjectType = {
  subject: string;
  professors: string[];
  id: string;
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

export type FormValues = {
  group: {
    id: string;
    label: string;
  };
  // groupID: string;
  weeks: string[];
  weekday: string;
  professorsAndAuditories: Array<{
    auditory: string;
    professor: string;
  }>;
  subject: string;
  start: Date;
};

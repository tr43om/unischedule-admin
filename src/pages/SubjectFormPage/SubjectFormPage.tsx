import React from "react";

import { useForm, DefaultValues } from "react-hook-form";
import { SubjectFormValues } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFieldOfStudy } from "../../components";
import * as yup from "yup";

const SubjectFormPage = () => {
  const defaultValues: DefaultValues<SubjectFormValues> = {
    fieldOfStudy: "",
    subject: "",
  };

  const {
    handleSubmit,
    control,
    getValues,
    reset,

    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<SubjectFormValues>({
    defaultValues,
    resolver: yupResolver(addSubjectSchema),
  });

  return <div>SubjectFormPage</div>;
};

const addSubjectSchema = yup.object({});
export default SubjectFormPage;

import React from "react";

import { useForm, DefaultValues, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfessorFormRequestType } from "../../../../types";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../../firebase.config";
import { useSnackbar } from "notistack";
import { Stack, TextField } from "@mui/material";
import { UploadPFPArea } from "../../../../components";
import { nanoid } from "nanoid";

import { useFirestoreStorage } from "../../../../hooks/useFirestoreStorage";

import { ref } from "firebase/storage";
import { LoadingButton } from "@mui/lab";

const AddProfessorTab = () => {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: DefaultValues<ProfessorFormRequestType> = {};

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<ProfessorFormRequestType>({
    defaultValues,
    resolver: yupResolver(addProfessorSchema),
    mode: "onChange",
  });

  const { storeFile } = useFirestoreStorage();

  const addProfessor = handleSubmit(
    async ({ firstname, patronym, surname, PFP, PFPThumbnail }) => {
      try {
        const collectionRef = collection(db, "professors");

        const pfpPath = `professors/PFPs/${nanoid()}`;
        const thumbnailPath = `professors/thumbnails/${nanoid()}`;

        const PFP_URL = await storeFile(PFP, ref(storage, pfpPath));
        const PFP_THUMBNAIL_URL = await storeFile(
          PFPThumbnail,
          ref(storage, thumbnailPath)
        );

        const professor = {
          firstname,
          patronym,
          surname,
          PFP_URL,
          PFP_THUMBNAIL_URL,
        };

        await addDoc(collectionRef, professor);
        reset({ firstname, patronym, surname, PFP, PFPThumbnail });

        enqueueSnackbar(
          `${surname} ${firstname[0]}.${patronym[0]}. добавлен(а) в список преподавателей`,
          {
            variant: "success",
          }
        );
      } catch (error) {
        enqueueSnackbar("error", {
          variant: "error",
        });
      }
    }
  );

  return (
    <Stack gap={3}>
      <Controller
        control={control}
        name="surname"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Фамилия"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="firstname"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Имя"
            error={!!error}
            helperText={error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="patronym"
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Отчество"
            helperText={error?.message}
            error={!!error}
          />
        )}
      />

      <UploadPFPArea control={control} />

      <LoadingButton
        type="submit"
        onClick={addProfessor}
        variant="contained"
        loading={isSubmitting}
      >
        Добавить
      </LoadingButton>
    </Stack>
  );
};

const addProfessorSchema = yup.object({
  firstname: yup.string().required("Введите имя"),
  surname: yup.string().required("Введите фамилию"),
  patronym: yup.string().required("Введите отчество"),
  PFP: yup
    .mixed()
    .notRequired()
    .test(
      "fileSize",
      "Размер файла не должен превышеть более 1 мб!",
      (value: File | undefined) => {
        if (typeof value === "undefined") return true;
        return value.size <= 1000000;
      }
    ),
  PFPThumbnail: yup.mixed().when("PFP", {
    is: (value: File) => value && value.name,
    then: yup.mixed().required("choose thumbnail"),
  }),
});
export default AddProfessorTab;

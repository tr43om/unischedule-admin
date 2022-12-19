import React from "react";

import { useForm, DefaultValues, useWatch, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CourseFormValues, ProfessorFormValues } from "../../types";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { useSnackbar } from "notistack";
import {
  Button,
  FormControl,
  FormHelperText,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UploadButton } from "../../components";
import { nanoid } from "nanoid";
import { useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ProfessorFormPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues: DefaultValues<ProfessorFormValues> = {};

  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ProfessorFormValues>({
    defaultValues,
    resolver: yupResolver(addProfessorSchema),
    mode: "onChange",
  });

  const addProfessor = handleSubmit(
    async ({ firstname, patronym, picture, surname }) => {
      try {
        const collectionRef = collection(db, "professors");

        const shortname = `${surname} ${firstname[0]}.${patronym[0]}.`;

        const storePicture = async (picture: File) => {
          const pictureName = `${shortname}-${nanoid()}`;
          const storageRef = ref(storage, `images/${pictureName}`);
          const uploadTask = uploadBytesResumable(storageRef, picture);

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                  default:
                    return "jopa";
                }
              },
              (error) => {
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
                });
              }
            );
          });
        };

        const avatarURL = await storePicture(picture);

        const professor = {
          shortname,
          firstname,
          patronym,
          surname,
          avatarURL,
        };

        await addDoc(collectionRef, professor);

        enqueueSnackbar(`${shortname} добавлен(а) в список преподавателей`, {
          variant: "success",
        });

        console.log(professor);
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

      <UploadButton control={control} />

      {errors.picture && <Typography>{errors.picture.message}</Typography>}

      <Button type="submit" onClick={addProfessor} variant="contained">
        Добавить
      </Button>
    </Stack>
  );
};

const addProfessorSchema = yup.object({
  firstname: yup.string().required("Введите имя"),
  surname: yup.string().required("Введите фамилию"),
  patronym: yup.string().required("Введите отчество"),
  picture: yup
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
});

export default ProfessorFormPage;

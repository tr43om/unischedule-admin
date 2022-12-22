import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  ImageListItem,
  Input,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { useState } from "react";
import Image from "mui-image";
import { Close as CloseIcon, Delete, Edit } from "@mui/icons-material";
import {
  Controller,
  Control,
  useController,
  useFormState,
} from "react-hook-form";
import { ProfessorFormValues } from "../../types";

import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { CroppedImagePreview } from "../CroppedImagePreview";

import { useDropzone } from "react-dropzone";
import { ChooseThumbnailModal } from "../ChooseThumbnailModal";
import PhotoIcon from "@mui/icons-material/Photo";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useWatch } from "react-hook-form";

type UploadPFPAreaProps = {
  label?: string;
  control: Control<ProfessorFormValues>;
};

const UploadPFPArea = ({
  label = "Загрузить",
  control,
}: UploadPFPAreaProps) => {
  const [PFP, setPFP] = useState<File | null>();
  const [isThumbnailModalOpened, setIsThumbnailModalOpened] = useState(false);
  const [isPhotoPreviewOpened, setIsPhotoPreviewOpened] = useState(false);

  const {
    field: { onChange: storePFP },
  } = useController({
    control,
    name: "PFP",
  });

  const { errors } = useFormState({
    control,
  });

  const { firstname, surname, patronym, PFPThumbnail } = useWatch({
    control,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const file = acceptedFiles[0];
    setIsThumbnailModalOpened(true);
    storePFP(file);
    setPFP(file);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFileDialogActive,
    isFocused,
  } = useDropzone({ onDrop });

  return (
    <>
      {PFP ? (
        <Card>
          <CardHeader
            avatar={
              <Stack flexDirection="row" alignItems="flex-end" gap={2}>
                <Tooltip title="Посмотреть изображение">
                  <img
                    width={90}
                    src={URL.createObjectURL(PFP)}
                    style={{ borderRadius: 5, cursor: "pointer" }}
                    alt="preview"
                    onClick={() => setIsPhotoPreviewOpened(true)}
                  />
                </Tooltip>
                {PFPThumbnail && (
                  <Tooltip title="Миниатюра">
                    <Avatar
                      src={URL.createObjectURL(PFPThumbnail)}
                      sx={{ width: 70, height: 70 }}
                    />
                  </Tooltip>
                )}
              </Stack>
            }
            action={
              <>
                <Tooltip title="Изменить миниатюру">
                  <IconButton onClick={() => setIsThumbnailModalOpened(true)}>
                    <Edit />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Выбрать другое фото ">
                  <IconButton onClick={() => setPFP(null)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </>
            }
            title={`${surname} ${firstname} ${patronym}`}
          />

          <Dialog
            open={isPhotoPreviewOpened}
            onClose={() => setIsPhotoPreviewOpened(false)}
          >
            <img src={URL.createObjectURL(PFP)} alt="preview" />
          </Dialog>

          <ChooseThumbnailModal
            isOpened={isThumbnailModalOpened}
            closeModal={() => setIsThumbnailModalOpened(false)}
            control={control}
            imgURL={URL.createObjectURL(PFP)}
          />
          <Typography>{errors && errors.PFPThumbnail?.message}</Typography>
        </Card>
      ) : (
        <Box
          {...getRootProps()}
          sx={({ palette }) => ({
            border: isDragActive ? "2px dashed gray " : "2px dashed lightgray",
            paddingBlock: 5,
            cursor: "pointer",
            borderRadius: 5,
            backgroundColor: isDragActive ? "lightgray" : "",
          })}
          textAlign="center"
        >
          <Box
            component="input"
            accept="image/*"
            hidden
            type="file"
            {...getInputProps()}
          />
          <>
            {isDragActive ? (
              <PhotoIcon
                sx={({ palette }) => ({
                  fill: palette.primary.main,
                  fontSize: 60,
                })}
              />
            ) : (
              <AddPhotoAlternateIcon
                sx={({ palette }) => ({
                  fill: palette.primary.main,
                  fontSize: 60,
                })}
              />
            )}
            <Typography variant="h5" fontWeight="bold">
              Перетащите фото преподавателя сюда <br /> или
              <Box
                sx={({ palette }) => ({
                  display: "inline",
                  color: palette.primary.main,
                  fontWeight: "bold",
                })}
              >
                {" "}
                выберите вручную
              </Box>
            </Typography>
            <Typography color="gray">jpeg, png размером до 1 МЬ</Typography>
          </>
        </Box>
      )}
    </>
  );
};

export default UploadPFPArea;

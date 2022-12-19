import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  ImageListItem,
  Input,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { useState } from "react";
import Image from "mui-image";
import { Close as CloseIcon } from "@mui/icons-material";
import { Controller, Control, useController } from "react-hook-form";
import { ProfessorFormValues } from "../../types";

import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import { getCroppedImg } from "./cropImage";
import { CroppedImagePreview } from "../CroppedImagePreview";

import { useDropzone } from "react-dropzone";

type UploadButtonProps = {
  label?: string;
  control: Control<ProfessorFormValues>;
};

const UploadButton = ({ label = "Загрузить", control }: UploadButtonProps) => {
  const [file, setFile] = useState<File | null>();
  const [isPreviewOpened, setIsPreviewOpened] = useState(false);

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropArea, setCroppedArea] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    const file = acceptedFiles[0];
    setIsPreviewOpened(true);
    setFile(file);
    onChange(file);
  }, []);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setIsPreviewOpened(true);
    setFile(file);
    onChange(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const showCroppedImage = useCallback(async () => {
    try {
      if (!croppedAreaPixels) return;
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file as File),
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, file]);

  const {
    field: { onChange },
  } = useController({
    control,
    name: "picture",
  });

  const fileSize = `${file && (file.size / 1000000).toFixed(2)} мб`;

  const handleFileRemove = () => {
    setFile(null);
    onChange(undefined);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
        {label}
        <Box
          component="input"
          accept="image/*"
          hidden
          type="file"
          onChange={handleFileUpload}
        />
      </Button>

      <Box {...getRootProps()}>
        <Box
          component="input"
          accept="image/*"
          hidden
          type="file"
          {...getInputProps()}
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>

      {file && (
        <Modal open={isPreviewOpened}>
          <Paper
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              minWidth: 500,
              minHeight: 300,
            }}
          >
            <Card>
              <CardHeader
                action={
                  <IconButton onClick={handleFileRemove}>
                    <CloseIcon />
                  </IconButton>
                }
                title={file.name}
                subheader={fileSize}
              />

              <CardContent>
                <Stack flexDirection="row" gap={3} alignItems="flex-end">
                  <Box sx={{ position: "relative", width: 300, height: 200 }}>
                    <Cropper
                      image={URL.createObjectURL(file)}
                      crop={crop}
                      rotation={rotation}
                      zoom={zoom}
                      aspect={1}
                      objectFit="contain"
                      showGrid={false}
                      onCropChange={setCrop}
                      onRotationChange={setRotation}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      onCropAreaChange={(croppedArea) => {
                        setCroppedArea(croppedArea);
                      }}
                      cropShape="round"
                    />
                  </Box>

                  {file && cropArea && (
                    <Stack>
                      <CroppedImagePreview
                        src={URL.createObjectURL(file)}
                        croppedArea={cropArea}
                        size={50}
                      />
                      <CroppedImagePreview
                        src={URL.createObjectURL(file)}
                        croppedArea={cropArea}
                        size={100}
                      />
                    </Stack>
                  )}
                </Stack>
                <Button onClick={showCroppedImage}>рез</Button>
              </CardContent>
            </Card>
          </Paper>
        </Modal>
      )}
    </Stack>
  );
};

export default UploadButton;

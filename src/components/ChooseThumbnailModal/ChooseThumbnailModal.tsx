import React, { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { Control } from "react-hook-form/dist/types/form";
import { ProfessorFormValues } from "../../types";
import { useController } from "react-hook-form";
import { getCroppedImg } from "./cropImage";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  IconButton,
  Modal,
  Paper,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { CroppedImagePreview } from "../CroppedImagePreview";

type ChooseThumbnailModalProps = {
  control: Control<ProfessorFormValues>;
  imgURL: string;
  isOpened: boolean;
  closeModal: () => void;
};

const ChooseThumbnailModal = ({
  control,
  imgURL,
  closeModal,
  isOpened,
}: ChooseThumbnailModalProps) => {
  //   const [file, setFile] = useState<File | null>();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [cropArea, setCroppedArea] = useState<Area | null>(null);

  const {
    field: { onChange: storePFPThumbnail },
  } = useController({
    control,
    name: "PFPThumbnail",
  });

  const handleFileRemove = () => {
    closeModal();
    storePFPThumbnail(undefined);
  };

  // crop
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
      setCroppedArea(croppedArea);
    },
    []
  );

  const getThumbnail = useCallback(async () => {
    try {
      if (!croppedAreaPixels) return;
      const thumbnail = await getCroppedImg(
        imgURL,
        croppedAreaPixels,
        rotation
      );

      storePFPThumbnail(thumbnail);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, imgURL, storePFPThumbnail]);

  return (
    <Dialog open={isOpened} onClose={closeModal}>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleFileRemove}>
              <CloseIcon />
            </IconButton>
          }
        />

        <CardContent>
          <Stack flexDirection="row" gap={3} alignItems="flex-end">
            <Box
              sx={{
                position: "relative",
                width: 300,
                height: 200,
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Cropper
                image={imgURL}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={1}
                objectFit="vertical-cover"
                showGrid={false}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                cropShape="round"
              />
            </Box>

            {cropArea && (
              <Stack>
                <CroppedImagePreview
                  src={imgURL}
                  croppedArea={cropArea}
                  size={50}
                />
                <CroppedImagePreview
                  src={imgURL}
                  croppedArea={cropArea}
                  size={100}
                />
              </Stack>
            )}
          </Stack>
          <Button onClick={getThumbnail} variant="contained" sx={{ mt: 3 }}>
            Сохранить
          </Button>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default ChooseThumbnailModal;

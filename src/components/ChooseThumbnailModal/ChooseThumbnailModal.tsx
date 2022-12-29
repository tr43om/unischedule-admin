import React, { useCallback, useState } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { Control } from "react-hook-form/dist/types/form";
import { ProfessorFormRequestType } from "../../types";
import { useController } from "react-hook-form";
import { getCroppedImg } from "./cropImage";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { CroppedImagePreview } from "../CroppedImagePreview";
import { LoadingButton } from "@mui/lab";

type ChooseThumbnailModalProps = {
  control?: Control<ProfessorFormRequestType>;
  isOpened: boolean;
  uploadPFPandThumbnail?: (newPFP: File, newThumbnail: File) => void;
  uploading?: boolean;
  closeModal: () => void;
  file: File;
};

const ChooseThumbnailModal = ({
  control,
  closeModal,
  isOpened,
  file,
  uploading,
  uploadPFPandThumbnail,
}: ChooseThumbnailModalProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropArea, setCroppedArea] = useState<Area | null>(null);
  const [thumbnail, setThumbnail] = useState<File>();

  const PFPsrc = URL.createObjectURL(file);

  const {
    field: { onChange: storeThumbnail },
  } = useController({
    control,
    name: "PFPThumbnail",
  });

  const handleFileRemove = () => {
    closeModal();
    storeThumbnail(undefined);
  };

  // crop
  const onCropComplete = useCallback(
    async (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedArea);

      const thumbnail = await getCroppedImg(
        PFPsrc,
        croppedAreaPixels,
        rotation
      );

      setThumbnail(thumbnail);
    },
    [PFPsrc, rotation]
  );

  const uploadFiles = () => {
    storeThumbnail(thumbnail);

    if (thumbnail && uploadPFPandThumbnail) {
      uploadPFPandThumbnail(file, thumbnail);
    }

    if (!uploading) closeModal();
  };

  return (
    <Dialog open={isOpened} onClose={closeModal} fullWidth>
      <DialogTitle>
        Выберите миниатюру
        <DialogActions
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <IconButton onClick={handleFileRemove}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </DialogTitle>

      <DialogContent>
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
              image={PFPsrc}
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
                src={PFPsrc}
                croppedArea={cropArea}
                size={50}
              />
              <CroppedImagePreview
                src={PFPsrc}
                croppedArea={cropArea}
                size={100}
              />
            </Stack>
          )}
        </Stack>

        <LoadingButton
          loading={uploading}
          variant="contained"
          onClick={uploadFiles}
          sx={{ mt: 3 }}
        >
          Сохранить
        </LoadingButton>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseThumbnailModal;

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {
  Avatar,
  Card,
  CardHeader,
  Dialog,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

import { Delete, Edit } from "@mui/icons-material";
import { Control, useController, useFormState } from "react-hook-form";
import { ProfessorFormRequestType } from "../../types";

import { ChooseThumbnailModal } from "../ChooseThumbnailModal";

import { useWatch } from "react-hook-form";
import { DropZone } from "../DropZone";

type UploadPFPAreaProps = {
  label?: string;
  control: Control<ProfessorFormRequestType>;
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

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setIsThumbnailModalOpened(true);
      storePFP(file);
      setPFP(file);
    },
    [storePFP]
  );

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
            title={`${surname ? surname : ""} ${firstname ? firstname : ""} ${
              patronym ? patronym : ""
            }`}
          />

          <Dialog
            open={isPhotoPreviewOpened}
            onClose={() => setIsPhotoPreviewOpened(false)}
          >
            <img src={URL.createObjectURL(PFP)} alt="preview" />
          </Dialog>

          <ChooseThumbnailModal
            file={PFP}
            isOpened={isThumbnailModalOpened}
            closeModal={() => setIsThumbnailModalOpened(false)}
            control={control}
          />
          <Typography>{errors && errors.PFPThumbnail?.message}</Typography>
        </Card>
      ) : (
        <DropZone onDrop={onDrop} />
      )}
    </>
  );
};

export default UploadPFPArea;

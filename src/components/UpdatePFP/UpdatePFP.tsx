import React, { useCallback, useState } from "react";

import {
  Box,
  Avatar,
  Stack,
  Paper,
  styled,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
} from "@mui/material";

import {
  PhotoCameraOutlined as PhotoIcon,
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  AddAPhoto as AddPhotoIcon,
  AddAPhotoOutlined as AddPhotoOutlinedIcon,
} from "@mui/icons-material";

import { ContextMenuOption } from "../ui";
import { DropZone } from "../DropZone";

import Image from "mui-image";
import { ChooseThumbnailModal } from "../ChooseThumbnailModal";
import CircularProgress from "@mui/material/CircularProgress";
import { ref, deleteObject as deleteFileFromStorage } from "@firebase/storage";
import { db, storage } from "../../firebase.config";
import { doc, collection, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useFirestoreStorage } from "../../hooks/useFirestoreStorage";

type UpdatePFPprops = {
  src: string;
  pfpPath: string;
  thumbnailPath: string;
  size?: number;
  documentID: string;
};

const UpdatePFP = ({
  src,
  pfpPath,
  thumbnailPath,
  documentID,
  size = 100,
}: UpdatePFPprops) => {
  const [isContextMenuOpened, setIsContextMenuOpened] = useState(false);
  const [isUploadPFPModalOpened, setIsUploadPFPModalOpened] = useState(false);
  const [isThumbnailModalOpened, setIsThumbnailModalOpened] = useState(false);
  const [pfp, setPfp] = useState<File | null>();

  const handleContextMenuOpen = () => setIsContextMenuOpened(true);
  const handleContextMenuClose = () => setIsContextMenuOpened(false);

  const handleUploadPFPModalOpen = () => setIsUploadPFPModalOpened(true);
  const handleUploadPFPModalClose = () => setIsUploadPFPModalOpened(false);

  const handleThumbnailModalOpen = () => {
    setIsThumbnailModalOpened(true);
    handleUploadPFPModalClose();
  };
  const handleThumbnailModalClose = () => setIsThumbnailModalOpened(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setPfp(file);
  }, []);

  const { storeFile, uploading } = useFirestoreStorage();

  const updatePFPandThumbnail = useCallback(
    async (newPFP: File, newThumbnail: File) => {
      const previousPFPRef = ref(storage, pfpPath);
      const previousThumbnailRef = ref(storage, thumbnailPath);

      // DELETE old thumbnail and profile picture
      await deleteFileFromStorage(previousPFPRef);
      await deleteFileFromStorage(previousThumbnailRef);

      const newPfpPath = `professors/PFPs/${nanoid()}`;
      const newThumbnailPath = `professors/thumbnails/${nanoid()}`;
      const newPFPRef = ref(storage, newPfpPath);
      const newThumbnailRef = ref(storage, newThumbnailPath);

      // ADD new thumbnail and profile picture
      const PFP_URL = await storeFile(newPFP, newPFPRef);
      const PFP_THUMBNAIL_URL = await storeFile(newThumbnail, newThumbnailRef);

      // UPDATE url for professor document
      const professorRef = doc(collection(db, "professors"), documentID);
      await updateDoc(professorRef, {
        PFP_URL,
        PFP_THUMBNAIL_URL,
      });

      setPfp(null);
    },
    [documentID, pfpPath, thumbnailPath, storeFile]
  );

  return (
    <>
      <Box
        onMouseEnter={handleContextMenuOpen}
        onMouseLeave={handleContextMenuClose}
        sx={{
          width: size,
          height: size,
          cursor: "pointer",
          paddingBottom: 16,
        }}
      >
        <Box position="relative" display="flex">
          <Avatar
            src={src}
            sx={{
              width: size,
              height: size,
              filter: "brightness(60%)",
            }}
            key={nanoid()}
          />

          {src ? <PhotoIconStyled /> : null}
          {!src ? <AddPhotoIconStyled /> : null}
        </Box>

        {isContextMenuOpened && (
          <Stack
            component={Paper}
            sx={{
              p: 1,
              position: "absolute",
              mt: 2,
              zIndex: 999,
            }}
            gap={1.5}
          >
            <ContextMenuOption
              icon={src ? EditIcon : AddPhotoIcon}
              label={src ? "Обновить фотографию" : "Добавить фотографию"}
              onClick={handleUploadPFPModalOpen}
            />

            {src && (
              <ContextMenuOption
                isDeleteOption={true}
                icon={DeleteOutlineIcon}
                label="Удалить"
              />
            )}
          </Stack>
        )}
      </Box>

      <Dialog open={isUploadPFPModalOpened} fullWidth>
        <DialogTitle>Загрузка новой фотографии</DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
          }}
        >
          {pfp ? (
            <Box
              component={Image}
              src={URL.createObjectURL(pfp)}
              fit="contain"
              alt="professor-pfp"
              sx={{ maxHeight: 300 }}
              duration={500}
            />
          ) : (
            <DropZone onDrop={onDrop} />
          )}

          <Stack mt={3} flexDirection="row" gap={2}>
            <Button
              variant="text"
              onClick={() => {
                handleUploadPFPModalClose();
                setPfp(null);
              }}
            >
              Вернуться назад
            </Button>
            <Button
              disabled={!pfp}
              variant="contained"
              onClick={handleThumbnailModalOpen}
            >
              Сохранить и продолжить
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      {pfp && (
        <ChooseThumbnailModal
          uploadPFPandThumbnail={updatePFPandThumbnail}
          uploading={uploading}
          file={pfp}
          closeModal={handleThumbnailModalClose}
          isOpened={isThumbnailModalOpened}
        />
      )}
    </>
  );
};

const AddPhotoIconStyled = styled(AddPhotoOutlinedIcon)({
  fill: "#fff",
  position: "absolute",
  top: "50%",
  left: "50%",
  fontSize: 30,
  transform: "translate(-50%, -50%)",
});

const PhotoIconStyled = styled(PhotoIcon)({
  fill: "#fff",
  position: "absolute",
  top: "50%",
  left: "50%",
  fontSize: 30,
  transform: "translate(-50%, -50%)",
});

const SpinnerStyled = styled(CircularProgress)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default UpdatePFP;

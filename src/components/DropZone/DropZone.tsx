import { Box, Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import PhotoIcon from "@mui/icons-material/Photo";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

type DropZoneProps = {
  onDrop: (acceptedFiles: File[]) => void;
};

const DropZone = ({ onDrop }: DropZoneProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFileDialogActive,
    isFocused,
  } = useDropzone({ onDrop });
  return (
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
            выберите вручную
          </Box>
        </Typography>
        <Typography color="gray">jpeg, png размером до 1 МЬ</Typography>
      </>
    </Box>
  );
};

export default DropZone;

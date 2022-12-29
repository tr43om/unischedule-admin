import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

type ConfirmationModalProps = {
  confirmationAction?: () => void;
  closeConfirmationModal: () => void;
  title: string;
  isOpened: boolean;
};

const ConfirmationModal = ({
  confirmationAction,
  title,
  isOpened,
  closeConfirmationModal,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={isOpened}>
      <DialogContent>
        <DialogTitle
          sx={({ palette }) => ({
            display: "grid",
            placeItems: "center",
            color: palette.primary.main,
          })}
        >
          <DeleteSweepIcon
            sx={({ palette }) => ({
              fontSize: 40,
              fill: palette.primary.main,
            })}
          />
          <Typography>{title}</Typography>
        </DialogTitle>
        <DialogContentText></DialogContentText>
        <DialogActions>
          <Stack gap={3} flexDirection="row" mt={4}>
            <Button variant="outlined" onClick={closeConfirmationModal}>
              Отмена
            </Button>
            <Button variant="contained" onClick={confirmationAction}>
              Удалить
            </Button>
          </Stack>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;

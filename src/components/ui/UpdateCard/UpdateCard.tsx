import React, { ReactNode, useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  ClickAwayListener,
  Input,
  Typography,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import {
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import { ContextMenuOption } from "../ContextMenuOption";
import { EditingMode } from "../../EditingMode";
import { ConfirmationModal } from "../ConfirmationModal";

type UpdateCardType = {
  title: string;
  avatar?: ReactNode;
  isDisabled?: boolean;
  update: (value: string) => void;
  edit?: () => void;
  deleteCard: () => void;
  mode?: string;
  isLink?: boolean;
};

const UpdateCard = ({
  title,
  avatar,
  update,
  deleteCard,
  edit,
  isDisabled = false,
  isLink = false,
}: UpdateCardType) => {
  const [startEditing, setStartEditing] = useState<boolean>(false);
  const [isContextMenuOpened, setIsContextMenuOpened] = useState(false);
  const [isConfirmationModalOpened, setIsConfirmationModalOpened] =
    useState(false);

  const handleContextMenuOpen = () => {
    setIsContextMenuOpened(true);
  };

  const handleContextMenuClose = () => {
    setIsContextMenuOpened(false);
  };

  const handleEdit = () => {
    if (edit) edit();
    setStartEditing((isEdit) => !isEdit);
    handleContextMenuClose();
  };

  return (
    <Box
      onContextMenu={handleContextMenuOpen}
      onMouseEnter={handleContextMenuOpen}
      onMouseLeave={handleContextMenuClose}
      sx={{
        position: "relative",
        paddingBottom: 2,
        cursor: isLink ? "pointer" : "",
      }}
    >
      <Card sx={{ overflow: "unset" }}>
        <CardHeader
          title={
            <EditingMode
              handleUpdate={(value) => update(value)}
              editing={startEditing}
              withIcon={false}
            >
              {title}
            </EditingMode>
          }
          action={
            <>
              {isLink && (
                <IconButton>
                  <LaunchIcon sx={{ fontSize: 15 }} />
                </IconButton>
              )}
            </>
          }
          avatar={avatar}
        />
      </Card>

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
            onClick={handleEdit}
            icon={EditIcon}
            label="Редактировать"
          />
          <ContextMenuOption
            onClick={() => {
              // deleteCard();
              setIsConfirmationModalOpened(true);
            }}
            icon={DeleteOutlineIcon}
            label="Удалить"
            isDeleteOption
          />
          <ConfirmationModal
            title="Удалить?"
            isOpened={isConfirmationModalOpened}
            closeConfirmationModal={() => setIsConfirmationModalOpened(false)}
            confirmationAction={() => deleteCard()}
          />
        </Stack>
      )}
    </Box>
  );
};

export default UpdateCard;

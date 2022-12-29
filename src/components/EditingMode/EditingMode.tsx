import Edit from "@mui/icons-material/Edit";
import {
  Box,
  ClickAwayListener,
  IconButton,
  Input,
  Typography,
  styled,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useEffect } from "react";

type EditingModeProps = {
  children: ReactNode;
  handleUpdate: (value: string) => void;
  withIcon?: boolean;
  editing?: boolean;
};

const EditingMode = ({
  children,
  handleUpdate,
  withIcon = true,
  editing,
}: EditingModeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (typeof editing === "boolean") setIsEditing(editing);
  }, [editing]);

  const [value, setValue] = useState(
    typeof children === "string" ? children : ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(e.target.value);
  };

  const handleEnterPress = ({
    key,
  }: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    key === "Enter" ? edit() : null;

  const edit = () => {
    handleUpdate(value);
    setIsEditing(false);
  };

  const startEdit = () => setIsEditing(true);

  return (
    <Box onDoubleClick={startEdit}>
      {isEditing ? (
        <ClickAwayListener
          onClickAway={edit}
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
        >
          <Input
            sx={{ width: value.length + 2 + "ch" }}
            value={value}
            autoFocus
            fullWidth
            onKeyDown={handleEnterPress}
            onChange={handleChange}
          />
        </ClickAwayListener>
      ) : (
        <Box sx={{ position: "relative" }}>
          {withIcon && (
            <IconButton
              sx={{ position: "absolute", right: -25, top: -10 }}
              onClick={startEdit}
            >
              <Edit sx={{ fontSize: 13 }} />
            </IconButton>
          )}
          <Typography sx={{ userSelect: "none" }}>{children}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default EditingMode;

import React, { useState } from "react";
import { SubjectType } from "../../types";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  CardActions,
  Avatar,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Box,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import MoreVertIcon from "@mui/icons-material/MoreVert";
type SubjectCardType = {
  option: SubjectType;
  index: number;
};

const SubjectCard = ({ index, option }: SubjectCardType) => {
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  const toggleMenu = (event: React.MouseEvent) => {
    setOpenMenu((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpenMenu(false);
  };

  return (
    <Card sx={{ overflow: "unset" }}>
      <CardHeader
        title={option.subject}
        titleTypographyProps={{ fontSize: 20 }}
        avatar={<Avatar>{index + 1}</Avatar>}
        action={
          <Box position="relative">
            <IconButton onClick={toggleMenu}>
              <MoreVertIcon />
            </IconButton>
            {/* <IconButton size="small">
              <EditIcon />
            </IconButton>

            <IconButton size="small" color="error">
              <DeleteOutlineIcon />
            </IconButton> */}
            {openMenu && (
              <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={handleClickAway}
              >
                <MenuList
                  sx={{ position: "absolute", zIndex: 999 }}
                  component={Paper}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText>Редактировать</ListItemText>
                  </MenuItem>
                  <MenuItem>
                    <ListItemIcon color="error">
                      <DeleteOutlineIcon />
                    </ListItemIcon>
                    <ListItemText>Удалить</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            )}
          </Box>
        }
      />
      <CardActions sx={{ display: "flex", marginLeft: "auto" }}></CardActions>
    </Card>
  );
};

export default SubjectCard;

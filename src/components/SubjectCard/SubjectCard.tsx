import React, { useRef, useState } from "react";
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
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Box,
  Paper,
  ClickAwayListener,
  Input,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import * as _ from "lodash";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useSnackbar } from "notistack";

type SubjectCardType = {
  option: SubjectType;
  index: number;
};

const SubjectCard = ({ index, option }: SubjectCardType) => {
  const [startEditing, setStartEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newSubjectValue, setNewSubjectValue] = useState<string>(
    option.subject
  );
  const { enqueueSnackbar } = useSnackbar();
  const open = Boolean(anchorEl);
  const subjectRef = doc(collection(db, "subjects"), option.id);

  const deleteSubject = async () => {
    await deleteDoc(subjectRef);
    enqueueSnackbar(`Предмет ${option.subject} был удалён`);
    handleClose();
  };

  const updateSubject = async () => {
    setStartEditing(false);
    updateDoc(subjectRef, { subject: newSubjectValue });

    console.log(newSubjectValue);
  };

  const editSubject = () => {
    setStartEditing((isEdit) => !isEdit);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Card sx={{ overflow: "unset" }}>
      <CardHeader
        title={
          <>
            {startEditing ? (
              <ClickAwayListener
                onClickAway={updateSubject}
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
              >
                <Input
                  value={newSubjectValue}
                  autoFocus
                  fullWidth
                  onKeyDown={({ key }) =>
                    key === "Enter" ? updateSubject() : null
                  }
                  onChange={(e) => setNewSubjectValue(e.target.value)}
                />
              </ClickAwayListener>
            ) : (
              <Typography
                onDoubleClick={editSubject}
                sx={{ userSelect: "none" }}
              >
                {option.subject}
              </Typography>
            )}
          </>
        }
        action={
          <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu onClose={handleClose} open={open} anchorEl={anchorEl}>
              <MenuItem onClick={editSubject}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>Редактировать</ListItemText>
              </MenuItem>
              <MenuItem onClick={deleteSubject}>
                <ListItemIcon>
                  <DeleteOutlineIcon sx={{ fill: "red" }} />
                </ListItemIcon>
                <ListItemText sx={{ color: "red" }}>Удалить</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
      />
    </Card>
  );
};

export default SubjectCard;

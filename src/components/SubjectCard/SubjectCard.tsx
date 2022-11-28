import React from "react";
import { SubjectType } from "../../types";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import MoreVertIcon from "@mui/icons-material/MoreVert";
type SubjectCardType = {
  option: SubjectType;
  index: number;
};

const SubjectCard = ({ index, option }: SubjectCardType) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <CardHeader
        title={option.subject}
        action={
          <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu onClose={handleClose} open={open} anchorEl={anchorEl}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </>
        }
      />
      <CardContent>
        <Typography>{option.subject}</Typography>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;

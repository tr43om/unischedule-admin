import {
  MenuItem,
  ListItemIcon,
  ListItemText,
  styled,
  ExtendButtonBase,
  MenuItemTypeMap,
} from "@mui/material";

import React, { JSXElementConstructor } from "react";

interface ContextMenuOptionProps
  extends React.ButtonHTMLAttributes<HTMLLIElement> {
  icon: JSXElementConstructor<{}>;
  isDeleteOption?: boolean;
  label: string;
}

const ContextMenuOption = ({
  icon,
  isDeleteOption,
  label,
  onClick,
}: ContextMenuOptionProps) => {
  const Option = styled(icon)(({ theme }) => ({
    fill: isDeleteOption
      ? theme.palette.error.main
      : theme.palette.primary.main,
  }));
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>
        <Option />
      </ListItemIcon>
      <ListItemText>{label}</ListItemText>
      <div></div>
    </MenuItem>
  );
};

export default ContextMenuOption;

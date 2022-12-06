import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  AppBar,
  Typography,
  ClickAwayListener,
  ListItemIcon,
} from "@mui/material";
import { drawerWidth } from "../../constants";
import { RoutesPaths } from "../../types";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddBoxIcon from "@mui/icons-material/AddBox";

type NavigationDrawerProps = {
  isOpen: boolean;
  closeDrawer: () => void;
};

const NavigationDrawer = ({ isOpen, closeDrawer }: NavigationDrawerProps) => {
  return (
    <>
      <Drawer
        ModalProps={{ onBackdropClick: () => closeDrawer }}
        anchor="right"
        variant="persistent"
        onClose={closeDrawer}
        open={isOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={closeDrawer} sx={{ marginLeft: -3 }}>
            <ChevronRightIcon />
          </IconButton>
        </Toolbar>
        <List component="nav">
          {/* <ListItemButton
            to={RoutesPaths.home}
            component={RouterNavLink}
            sx={({ palette }) => ({
              "&.active": {
                color: palette.secondary.main,
              },
            })}
          >
            <ListItemText>Главная страница</ListItemText>
          </ListItemButton> */}

          {/* <Divider variant="middle"></Divider> */}
          <ListItemButton
            to={RoutesPaths.course}
            component={RouterNavLink}
            sx={({ palette }) => ({
              "&.active": {
                color: palette.secondary.main,

                "& > .MuiListItemIcon-root": {
                  color: palette.secondary.main,
                },
              },
            })}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>Пары</ListItemText>
          </ListItemButton>

          <ListItemButton
            to={RoutesPaths.subject}
            component={RouterNavLink}
            sx={({ palette }) => ({
              "&.active": {
                color: palette.secondary.main,
                "& > .MuiListItemIcon-root": {
                  color: palette.secondary.main,
                },
              },
            })}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>Предметы</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;

import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { drawerWidth } from "../../constants";
import { RoutesPaths } from "../../types";

const NavigationDrawer = () => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List component="nav">
        <ListItemButton
          to={RoutesPaths.home}
          component={RouterNavLink}
          sx={({ palette }) => ({
            "&.active": {
              color: palette.secondary.main,
            },
          })}
        >
          <ListItemText>Главная страница</ListItemText>
        </ListItemButton>

        <Divider variant="middle"></Divider>
        <ListItemButton
          to={RoutesPaths.course}
          component={RouterNavLink}
          sx={({ palette }) => ({
            "&.active": {
              color: palette.secondary.main,
            },
          })}
        >
          <ListItemText>Добавить пару</ListItemText>
        </ListItemButton>

        <ListItemButton
          to={RoutesPaths.subject}
          component={RouterNavLink}
          sx={({ palette }) => ({
            "&.active": {
              color: palette.secondary.main,
            },
          })}
        >
          <ListItemText>Добавить предмет</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;

import React, { useState } from "react";
import GlobalStyle from "../../styles";

import { Outlet } from "react-router-dom";
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { drawerWidth } from "../../constants";
import { NavigationDrawer } from "../../components";
import { useParams, useLocation, useMatch } from "react-router-dom";
import { RoutesPaths } from "../../types";
import MenuIcon from "@mui/icons-material/Menu";

const LayoutPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography>unischedule.</Typography>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            edge="end"
            sx={{ marginLeft: "auto", color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <NavigationDrawer
        isOpen={drawerOpen}
        closeDrawer={() => setDrawerOpen(false)}
      />

      <Container
        sx={{
          position: "relative",
          marginRight: drawerOpen ? `${drawerWidth}px` : null,
        }}
      >
        <CssBaseline />
        <GlobalStyle />

        <Toolbar />
        <Outlet />
      </Container>
    </>
  );
};

export default LayoutPage;

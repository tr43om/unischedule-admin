import React from "react";
import GlobalStyle from "../../styles";

import { Outlet } from "react-router-dom";
import { Container, CssBaseline, Toolbar } from "@mui/material";
import { drawerWidth } from "../../constants";
import { NavigationDrawer } from "../../components";

const LayoutPage = () => {
  return (
    <Container sx={{ marginLeft: `${drawerWidth}px` }}>
      <CssBaseline />
      <GlobalStyle />
      <NavigationDrawer />
      <Toolbar />
      <Outlet />
    </Container>
  );
};

export default LayoutPage;

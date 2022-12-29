import { Tabs } from "@mui/material";
import React, { useState, SyntheticEvent } from "react";
import { Outlet } from "react-router-dom";
import { RoutesPaths } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { LinkTab } from "../../components";

const ProfessorFormPage = () => {
  const [tab, setTab] = useState(0);

  const changeTab = (event: SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  return (
    <>
      <Tabs value={tab} onChange={changeTab} sx={{ mb: 7 }} variant="fullWidth">
        <LinkTab
          to={RoutesPaths.addProfessor}
          label="Добавить"
          icon={<PersonAddIcon />}
        />
        <LinkTab
          to={RoutesPaths.updateProfessor}
          label="Изменить"
          icon={<EditIcon />}
        />
      </Tabs>

      <Outlet />
    </>
  );
};

export default ProfessorFormPage;

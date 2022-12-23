import { Tab, Tabs } from "@mui/material";
import React, { ReactNode } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { RoutesPaths } from "../../types";
import { AddProfessorTab, UpdateProfessorTab } from "./tabs";
import EditIcon from "@mui/icons-material/Edit";
import { TabProps } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface LinkTabProps {
  label?: string;
  to: string;
  icon?:
    | string
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
}

function LinkTab(props: LinkTabProps) {
  return <Tab component={Link} {...props} />;
}

const ProfessorFormPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ mb: 7 }}
        variant="fullWidth"
      >
        <LinkTab
          to={`${RoutesPaths.professor}${RoutesPaths.addProfessor}`}
          label="Добавить"
          icon={<PersonAddIcon />}
        />
        <LinkTab
          to={`${RoutesPaths.professor}${RoutesPaths.updateProfessor}`}
          label="Изменить"
          icon={<EditIcon />}
        />
      </Tabs>

      <Routes>
        <Route path={RoutesPaths.addProfessor} element={<AddProfessorTab />} />
        <Route
          path={RoutesPaths.updateProfessor}
          element={<UpdateProfessorTab />}
        />
      </Routes>
    </>
  );
};

export default ProfessorFormPage;

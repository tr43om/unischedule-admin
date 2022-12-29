import { Tab, Tabs } from "@mui/material";
import React, {
  useState,
  ReactNode,
  JSXElementConstructor,
  ReactElement,
  SyntheticEvent,
} from "react";
import { Link, Outlet } from "react-router-dom";
import { RoutesPaths } from "../../types";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface LinkTabProps {
  label?: string;
  to: string;
  icon?:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;
}

const LinkTab = (props: LinkTabProps) => {
  return <Tab component={Link} {...props} />;
};

export default LinkTab;

import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { useInfiniteHits } from "react-instantsearch-hooks-web";
import { SubjectType } from "../../types";

const SubjectHits = () => {
  const { hits, isLastPage, showMore } = useInfiniteHits<SubjectType>();

  return (
    <List>
      {hits.map((hit) => (
        <ListItemText>{hit.subject}</ListItemText>
      ))}
    </List>
  );
};

export default SubjectHits;

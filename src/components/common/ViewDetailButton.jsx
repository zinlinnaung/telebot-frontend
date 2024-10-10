import { Button } from "@mui/material";
import React from "react";

const ViewDetailButton = ({ name = "View" }) => {
  return (
    <Button
      size="small"
      variant="outlined"
      color={name === "Revoke" ? "secondary" : "primary"}
    >
      {name}
    </Button>
  );
};

export default ViewDetailButton;

import "react-device-frameset/styles/marvel-devices.min.css";
import React, { useState, useEffect, useRef } from "react";

import { Box } from "@mui/material";

import CampaignDetailComponent from "../../components/campaign/CampaignDetailComponent";

const SmsList = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <CampaignDetailComponent name={"sms"} />
    </Box>
  );
};

export default SmsList;

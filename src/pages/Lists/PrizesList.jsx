import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { DeviceFrameset } from "react-device-frameset";
import TextMessage from "../../components/message/TextMessage";
import ImageUpload from "../../components/message/ImageUpload";
import ButtonComponent from "../../components/message/Button";
import ChatBubble from "../../components/chat/ChatBubble";
import AnimatedNumber from "../../components/message/AnimatedNumber";
import axios from "axios";
import CampaignDetailComponent from "../../components/campaign/CampaignDetailComponent";

const ViberMessage = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <CampaignDetailComponent name={"viber"} />
    </Box>
  );
};

export default ViberMessage;

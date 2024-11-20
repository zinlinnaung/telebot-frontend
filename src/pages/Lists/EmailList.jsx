import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import NoRowOverlay from "../../components/common/NoRowOverlay";
import ViewDetailButton from "../../components/common/ViewDetailButton";
import useAxios from "../../hooks/useAxios";
import "react-device-frameset/styles/marvel-devices.min.css";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  TextareaAutosize,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ChatBubble from "../../components/chat/ChatBubble";
import { DeviceFrameset } from "react-device-frameset";
import { useSpring, animated } from "@react-spring/web";

import ImageUpload from "../../components/message/ImageUpload";
import TextMessage from "../../components/message/TextMessage";
import ButtonComponent from "../../components/message/Button";
import AnimatedNumber from "../../components/message/AnimatedNumber";
import EmailEditor from "../../components/message/EmailEditor";

const EmailList = () => {
  const api = useAxios();
  const { id } = useParams();

  const { data } = useQuery("winners", async () => {
    const response = await api.get("/api/participant");
    return response.data?.filter((item) => item.winner === true);
  });

  const [emailContent, setEmailContent] = useState("");
  const [subject, setSubject] = useState("");

  const handleContentChange = (content) => {
    setEmailContent(content);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            // height: "20%",
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: "100%",
              // height: "20%",
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Campaign Name
              </Typography>
              <Typography variant="h5" textAlign="center" color={"primary"}>
                {`Campaign ${id}`}
              </Typography>

              {/* Use the AnimatedNumber component to animate the user count */}
              {/* <AnimatedNumber targetNumber={1000} duration={3} /> */}
            </CardContent>
          </Card>
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: "100%",
              // height: "20%",
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                User Count
              </Typography>
              {/* Use the AnimatedNumber component to animate the user count */}
              <AnimatedNumber targetNumber={1000} duration={3} />
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            minHeight: "55vh",
            maxHeight: "80vh", // Limit the height of the whole box
            overflowY: "auto", // Enable vertical scrolling

            "&::-webkit-scrollbar": {
              width: "6px", // Set the width of the scrollbar
              height: "8px", // Set the height of the scrollbar (for horizontal scroll)
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#007bff", // Change the thumb color (the draggable part)
              borderRadius: "4px", // Rounded corners
              border: "2px solid #fff", // Optional: add a border around the thumb
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1", // Set the track color (the background of the scrollbar)
              borderRadius: "4px", // Rounded corners for the track
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "#f1f1f1", // If there's a scrollbar in both directions, the corner is customizable
            },
          }}
        >
          <EmailEditor
            emailContent={emailContent}
            // setEmailContent={setEmailContent}
            handleContentChange={handleContentChange}
            subject={subject}
            setSubject={setSubject}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleAddText} // Add text component
          >
            Add Text
          </Button> */}
          {/* <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleAddImage} // Add image component
          >
            Add Image
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleAddButton} // Add image component
          >
            Add Button
          </Button> */}

          {/* <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              setMessages([
                ...messages,
                { type: "button", content: "Not Click", sender: "bot" },
              ])
            }
          >
            Add Button
          </Button> */}
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() =>
            setMessages([
              ...messages,
              { type: "button", content: "Not Click", sender: "bot" },
            ])
          }
        >
          Publish
        </Button>
      </Box>

      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <DeviceFrameset
          device="Galaxy Note 8"
          color="gold"
          zoom={0.9}
          width={"60%"}
          height={"61vh"}
        >
          <Box
            mt={2}
            sx={{
              height: "60vh",
              margin: 2,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 2,
              "&::-webkit-scrollbar": {
                width: "1px", // Set the width of the scrollbar
                height: "8px", // Set the height of the scrollbar (for horizontal scroll)
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#007bff", // Change the thumb color (the draggable part)
                borderRadius: "4px", // Rounded corners
                border: "2px solid #fff", // Optional: add a border around the thumb
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1", // Set the track color (the background of the scrollbar)
                borderRadius: "4px", // Rounded corners for the track
              },
              "&::-webkit-scrollbar-corner": {
                backgroundColor: "#f1f1f1", // If there's a scrollbar in both directions, the corner is customizable
              },
            }}
          >
            <Stack spacing={2} p={2}>
              {console.log(emailContent)}
              <ChatBubble
                message={emailContent}
                isUser={false}
                type={"email"}
                subject={subject && subject}
              />
            </Stack>
          </Box>
        </DeviceFrameset>
      </Container>
    </Box>
  );
};

export default EmailList;

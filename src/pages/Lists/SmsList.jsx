import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
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

const SmsList = () => {
  const api = useAxios();

  const { data } = useQuery("winners", async () => {
    const response = await api.get("/api/participant");
    return response.data?.filter((item) => item.winner === true);
  });

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // State to track the order of added components (Text or Image)
  const [componentOrder, setComponentOrder] = useState([]);

  const [textComponents, setTextComponents] = useState([]);

  // Track the image for each image component
  const [imageComponents, setImageComponents] = useState([]);

  const [buttonComponents, setButtonComponents] = useState([]);

  // Editor State for Button (Name, Action, and Form Visibility)
  const [botmessage, setBotMessage] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonAction, setButtonAction] = useState("");
  const [showButtonForm, setShowButtonForm] = useState(false);

  // State to track the components themselves
  const [addedTextComponents, setAddedTextComponents] = useState([]);
  const [addedImageComponents, setAddedImageComponents] = useState([]);

  // Handle image change
  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      // Update the specific image component
      const updatedImageComponents = [...imageComponents];
      updatedImageComponents[index] = { content: imageUrl };
      setImageComponents(updatedImageComponents);

      // Simulate chatbot response with the image
      simulateChatbotResponse(imageUrl, false, index);
    }
  };

  // Handle sending the user's message
  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add the user's message to the chat
    const newMessage = { type: "text", content: input, sender: "user" };
    setMessages([...messages, newMessage]);

    // Add the message to the specific text component
    setTextComponents((prev) => [...prev, { content: input }]);

    setInput("");
    simulateChatbotResponse();
  };

  // Simulate Chatbot Response
  const simulateChatbotResponse = (imageUrl, is_replace) => {
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse = {
        type: "image",
        content: imageUrl ? imageUrl : "https://via.placeholder.com/150",
        sender: "bot",
      };

      if (!is_replace) {
        setMessages((prevMessages) => [...prevMessages, randomResponse]);
      } else {
        setMessages((prevMessages) => [randomResponse]);
      }
      setIsTyping(false);
    }, 1500);
  };

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAddButton = () => {
    setShowButtonForm(true); // Show the form to enter button name and function
    setComponentOrder((prev) => [...prev, "button"]);
    setButtonComponents((prev) => [
      ...prev,
      { label: buttonName, action: buttonAction },
    ]);
  };

  // Handle saving the button configuration and add it to the chat
  const handleSaveButton = () => {
    if (buttonName && buttonAction) {
      setShowButtonForm(false); // Hide the form after saving
      setButtonName(""); // Clear input fields
      setButtonAction(""); // Clear select box
    } else {
      alert("Please enter both a button name and select an action.");
    }
  };

  // Handle adding a text component
  const handleAddText = () => {
    // Ensure you add a new text component with empty content
    setComponentOrder((prev) => [...prev, "text"]);
    setTextComponents((prev) => [...prev, { content: "" }]);
  };

  // Handle adding an image component
  const handleAddImage = () => {
    // Ensure you add a new image component with empty content
    setComponentOrder((prev) => [...prev, "image"]);
    setImageComponents((prev) => [...prev, { content: "" }]);
  };
  const deleteComponent = (index, type) => {
    if (type === "text") {
      setTextComponents((prev) => prev.filter((_, idx) => idx !== index)); // Remove from textComponents
    } else if (type === "image") {
      setImageComponents((prev) => prev.filter((_, idx) => idx !== index)); // Remove from imageComponents
    } else if (type === "button") {
      setButtonComponents((prev) => prev.filter((_, idx) => idx !== index));
    }

    // Update the component order to remove the component type
    setComponentOrder((prev) => prev.filter((_, idx) => idx !== index));
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
        <Card
          sx={{
            mb: 3,
            width: "100%",
            height: "20%",
            minHeight: 100,
            maxHeight: 100,
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
          {/* Render components based on the order array */}
          {componentOrder.map((componentType, idx) => {
            if (componentType === "text") {
              return (
                <TextMessage
                  key={`text-${idx}`}
                  botmessage={textComponents[idx]?.content} // Render the text for the specific index
                  setBotMessage={(message) => {
                    const updatedTextComponents = [...textComponents];
                    updatedTextComponents[idx] = { content: message };
                    setTextComponents(updatedTextComponents);
                  }}
                  onDelete={() => deleteComponent(idx, "text")}
                />
              );
            }
            if (componentType === "image") {
              return (
                <ImageUpload
                  key={`image-${idx}`}
                  fileInputRef={fileInputRef}
                  handleImageChange={(event) => handleImageChange(event, idx)} // Pass index for image components
                  selectedImage={imageComponents[idx]?.content} // Render the image for the specific index
                  onDelete={() => deleteComponent(idx, "image")}
                />
              );
            }
            if (componentType === "button") {
              {
                console.log("buttonName", buttonName);
                console.log("label", buttonComponents);
              }
              return (
                <ButtonComponent
                  key={`button-${idx}`}
                  label={buttonComponents[idx]?.label}
                  onDelete={() => deleteComponent(idx, "button")}
                  buttonAction={buttonComponents[idx]?.action}
                  handleSaveButton={handleSaveButton}
                  setButtonAction={(message) => {
                    const updatedButtonComponents = [...buttonComponents];
                    updatedButtonComponents[idx] = {
                      ...updatedButtonComponents[idx],
                      action: message,
                    };
                    setButtonComponents(updatedButtonComponents);
                  }}
                  setButtonName={(message) => {
                    const updatedButtonComponents = [...buttonComponents];
                    updatedButtonComponents[idx] = {
                      ...updatedButtonComponents[idx],
                      label: message,
                    };
                    setButtonComponents(updatedButtonComponents);
                  }}
                />
              );
            }
            return null;
          })}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleAddText} // Add text component
          >
            Add Text
          </Button>
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
          zoom={0.8}
          width={"70%"}
          height={"70vh"}
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
              {/* {messages.map((message, idx) => (
                <ChatBubble
                  key={idx}
                  message={message}
                  isUser={message.sender === "user"}
                />
              ))} */}

              {componentOrder.map((componentType, idx) => {
                if (componentType === "text") {
                  return (
                    <ChatBubble
                      key={`text-${idx}`}
                      message={textComponents[idx]?.content}
                      isUser={false}
                      handleInputChange={setBotMessage}
                      type="text"
                      // setBotMessage={setBotMessage}
                      // onDelete={() => deleteComponent(idx, "text")}
                    />
                  );
                }
                if (componentType === "image") {
                  return (
                    <ChatBubble
                      key={`image-${idx}`}
                      message={imageComponents[idx]?.content}
                      handleInputChange={handleImageChange}
                      type="image"
                      // selectedImage={selectedImage}
                      // onDelete={() => deleteComponent(idx, "image")}
                    />
                  );
                }
                if (componentType === "button") {
                  return (
                    <ChatBubble
                      key={`button-${idx}`}
                      message={buttonComponents[idx]?.label}
                      handleInputChange={handleAddButton}
                      type="button"
                      action={buttonComponents[idx]?.action}
                      // selectedImage={selectedImage}
                      // onDelete={() => deleteComponent(idx, "image")}
                    />
                  );
                }
                return null;
              })}
              {isTyping && (
                <Typography variant="body1">Chatbot is typing...</Typography>
              )}
              <div ref={chatEndRef} />
            </Stack>
          </Box>

          <Box mt={2} display="flex" gap={1} sx={{ margin: 2 }}>
            <TextareaAutosize
              minRows={5}
              maxRows={10}
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                width: "90%",
                maxHeight: 50,
                border: "1px solid #ccc",
                borderRadius: 4,
                fontSize: 14,
                resize: "none",
              }}
            />
            <Button variant="contained" onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </DeviceFrameset>
      </Container>
    </Box>
  );
};

export default SmsList;

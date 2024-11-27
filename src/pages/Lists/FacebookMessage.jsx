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

const FacebookMessage = () => {
  const { id } = useParams();
  const chatEndRef = useRef(null);

  // Unified state for all components
  const [components, setComponents] = useState([]);
  const [campaignData, setCampaignData] = useState(null);

  // Fetch existing campaign details
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVICE_BASE_URL + `/campaigns/${id}`
        );
        setCampaignData(response.data);
        setComponents(JSON.parse(response.data.CampainDetail.facebook));
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };
    fetchCampaignDetails();
  }, [id]);

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [components]);

  // Add a new text component
  const handleAddText = () => {
    setComponents((prev) => [
      ...prev,
      { type: "text", content: "" }, // Default content can be empty
    ]);
  };

  // Add a new image component
  const handleAddImage = () => {
    setComponents((prev) => [
      ...prev,
      { type: "image", content: "" }, // Default content can be empty
    ]);
  };

  // Add a new button component
  const handleAddButton = () => {
    setComponents((prev) => [
      ...prev,
      { type: "button", label: "", action: "" }, // Default properties
    ]);
  };

  // Update a text component
  const updateText = (index, newContent) => {
    setComponents((prev) =>
      prev.map((component, i) =>
        i === index ? { ...component, content: newContent } : component
      )
    );
  };

  // Update an image component
  const updateImage = (index, newContent) => {
    setComponents((prev) =>
      prev.map((component, i) =>
        i === index ? { ...component, content: newContent } : component
      )
    );
  };

  // Update a button component
  const updateButton = (index, newLabel, newAction) => {
    setComponents((prev) =>
      prev.map((component, i) =>
        i === index
          ? { ...component, label: newLabel, action: newAction }
          : component
      )
    );
  };

  // Delete a component
  const deleteComponent = (index) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  // Publish components to the server
  const handlePublish = async () => {
    if (!campaignData) {
      console.error("Campaign data is not loaded.");
      return;
    }

    try {
      const updatedData = {
        facebook: JSON.stringify(components), // Update the `facebook` field with components
      };
      console.log("Campaign data updated successfully:", updatedData);

      await axios.patch(
        import.meta.env.VITE_SERVICE_BASE_URL + `/campaigns/${id}/details`,
        updatedData
      );

      console.log("Campaign data updated successfully:", updatedData);
    } catch (error) {
      const updatedData = {
        ...campaignData,
        facebook: JSON.stringify(components), // Update the `facebook` field with components
      };
      console.log("Campaign data updated successfully:", updatedData);
      console.error("Error updating campaign data:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      {console.log("campaignData", campaignData)}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{ width: "100%", display: "flex", flexDirection: "row", gap: 2 }}
        >
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: "100%",
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Campaign Name
              </Typography>
              <Typography variant="h5" textAlign="center" color={"primary"}>
                {`${campaignData?.name}`}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: "100%",
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                User Count
              </Typography>
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
            minHeight: "50vh",
            maxHeight: "50vh",
            overflowY: "auto",
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
          {/* Render components */}
          {console.log("component", components)}
          {components.map((component, index) => {
            if (component.type === "text") {
              return (
                <TextMessage
                  key={`text-${index}`}
                  botmessage={component.content}
                  setBotMessage={(newContent) => updateText(index, newContent)}
                  onDelete={() => deleteComponent(index)}
                />
              );
            }
            if (component.type === "image") {
              return (
                <ImageUpload
                  key={`image-${index}`}
                  selectedImage={component.content}
                  handleImageChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      updateImage(index, URL.createObjectURL(file));
                    }
                  }}
                  onDelete={() => deleteComponent(index)}
                />
              );
            }
            if (component.type === "button") {
              return (
                <ButtonComponent
                  key={`button-${index}`}
                  label={component.label}
                  buttonAction={component.action}
                  setButtonName={(newLabel) =>
                    updateButton(index, newLabel, component.action)
                  }
                  setButtonAction={(newAction) =>
                    updateButton(index, component.label, newAction)
                  }
                  onDelete={() => deleteComponent(index)}
                />
              );
            }
            return null;
          })}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddText}>
            Add Text
          </Button>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddImage}>
            Add Image
          </Button>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddButton}>
            Add Button
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handlePublish}
          >
            Publish
          </Button>
        </Box>
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
              height: "55vh",
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
              {components.map((component, index) => (
                <ChatBubble
                  key={index}
                  message={
                    component.type === "button"
                      ? component.label
                      : component.content
                  }
                  type={component.type}
                  action={component.type === "button" && component.action}
                />
              ))}
              <div ref={chatEndRef} />
            </Stack>
          </Box>
        </DeviceFrameset>
      </Container>
    </Box>
  );
};

export default FacebookMessage;

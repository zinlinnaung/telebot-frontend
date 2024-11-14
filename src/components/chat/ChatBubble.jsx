import React from "react";
import { Box, Button, TextareaAutosize, Typography } from "@mui/material";

// ChatBubble Component
const ChatBubble = ({
  message,
  isUser,
  handleInputChange,
  type,
  action,
  subject,
}) => {
  const renderMessage = () => {
    switch (type) {
      case "text":
        return (
          <TextareaAutosize
            minRows={1}
            maxRows={100}
            value={message}
            onChange={handleInputChange}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              resize: "none",
            }}
          />
        );
      case "image":
        return <img src={message} alt="chatbot" style={{ maxWidth: "100%" }} />;

      case "email":
        return (
          <Box sx={{ padding: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: 1 }}
            >
              {subject ? subject : "This is subject"}
            </Typography>
            <Box
              sx={{
                fontSize: "0.9rem",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                "& p": { marginLeft: 1 },
              }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          </Box>
        );

      case "button":
        {
          console.log(message);
        }
        return (
          <Button
            variant="contained"
            onClick={() => alert(`Button Action: ${action && action}`)}
          >
            {message}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start", // Align to the right for user, left for bot
        alignItems: "center",
        padding: 1,
        margin: "5px 0",
      }}
    >
      {!isUser && (
        <Box
          sx={{
            // marginTop: 2,
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "#bbb", // Placeholder for bot's avatar
            marginRight: 1, // Space between avatar and message bubble
            display: "flex",
            // justifyContent: "end",
            alignSelf: "flex-end",
          }}
        />
      )}
      <Box
        sx={{
          background: isUser ? "#cce7ff" : "#e3f2fd", // Different background for user and bot
          borderRadius: 2,
          padding: 1,
          maxWidth: "80%", // Limit width to prevent overflow
          wordWrap: "break-word",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {renderMessage()}
      </Box>
      {isUser && (
        <Box
          sx={{
            // marginTop: 2,
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: "#000000", // Placeholder for user's avatar
            marginLeft: 1, // Space between message and avatar for user
            display: "flex",
            // justifyContent: "end",
            alignSelf: "flex-end",
          }}
        />
      )}
    </Box>
  );
};

export default ChatBubble;

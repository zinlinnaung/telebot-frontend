import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";

const FacebookSentMessage = () => {
  const [messages, setMessages] = useState({
    "User 1": [
      { text: "Hello, how are you?", sender: "user", timestamp: moment() },
      { text: "I'm good, thank you!", sender: "me", timestamp: moment() },
    ],
    "User 2": [{ text: "Hi there!", sender: "user", timestamp: moment() }],
    "User 3": [],
    "User 4": [],
  });
  const [unread, setUnread] = useState({
    "User 1": 0,
    "User 2": 1,
    "User 3": 0,
    "User 4": 0,
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("User 1");

  const userList = [
    { name: "User 1", avatar: "U1" },
    { name: "User 2", avatar: "U2" },
    { name: "User 3", avatar: "U3" },
    { name: "User 4", avatar: "U4" },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const timestamp = moment(); // Get current time for the message
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: [
          ...prevMessages[selectedUser],
          { text: newMessage, sender: "me", timestamp },
        ],
      }));
      setUnread((prevUnread) => ({
        ...prevUnread,
        [selectedUser]: prevUnread[selectedUser] + 1,
      }));
      setNewMessage("");
    }
  };

  const handleUserSelect = (userName) => {
    setSelectedUser(userName);

    // Mark messages as read for the selected user
    setUnread((prevUnread) => ({
      ...prevUnread,
      [userName]: 0,
    }));
  };

  return (
    <Paper
      sx={{
        flex: 1,
        overflow: "hidden",
        height: "80vh",
        display: "flex",
        flexDirection: "row",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Left Side: User List */}
      <Box
        sx={{
          width: "30%",
          borderRight: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Search Bar */}
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{
            m: 2,
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
            },
          }}
        />

        {/* User List */}
        <List sx={{ overflowY: "auto", flex: 1 }}>
          {userList.map((user, index) => (
            <ListItem
              button
              key={index}
              selected={selectedUser === user.name}
              onClick={() => handleUserSelect(user.name)}
              sx={{
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
                transition: "background-color 0.2s",
              }}
            >
              <ListItemAvatar>
                {/* Badge for unread messages */}
                <Badge
                  color="error"
                  variant={unread[user.name] > 0 ? "dot" : "standard"}
                >
                  <Avatar>{user.avatar}</Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Side: Chat Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        {/* Chat Header */}
        <Typography
          variant="h6"
          sx={{
            pb: "0.5rem",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Chat with {selectedUser}
        </Typography>

        {/* Chat Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {messages[selectedUser]?.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "me" ? "#007bff" : "#e0e0e0",
                color: msg.sender === "me" ? "#fff" : "#000",
                padding: "0.8rem",
                borderRadius: "12px",
                maxWidth: "60%",
                wordBreak: "break-word",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {msg.text}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#888",
                  marginTop: "0.2rem",
                }}
              >
                {msg.timestamp.format("hh:mm A")}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Message Input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "1rem",
            gap: "0.5rem",
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            sx={{
              backgroundColor: "#007bff",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default FacebookSentMessage;

import { Close } from "@mui/icons-material";
import { Box, IconButton, TextareaAutosize, Typography } from "@mui/material";
import React from "react";

const TextMessage = ({ setBotMessage, botmessage, onDelete }) => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h6">Text</Typography>

        {/* Delete Button */}
        <IconButton
          onClick={onDelete}
          sx={{
            // position: "absolute",
            // top: 0,
            // right: -400,
            color: "#fff",
            display: "flex",
            alignSelf: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <TextareaAutosize
        minRows={5}
        maxRows={10}
        placeholder="Enter your text"
        value={botmessage}
        onChange={(e) => setBotMessage(e.target.value)}
        style={{
          width: "100%",
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 4,
          fontSize: 14,
          height: 100,
          minHeight: 100,
          maxHeight: 100, // Fixed height for the text box
          resize: "none", // Disable resizing of the text box
          marginBottom: 20,
        }}
      />
    </>
  );
};

export default TextMessage;

import { Box, Typography, IconButton } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material"; // Material UI Close icon

const ImageUpload = ({
  fileInputRef,
  handleImageChange,
  selectedImage,
  onDelete,
}) => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h6">Image</Typography>

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
      <Box
        sx={{
          width: "100%",
          height: "50%",
          minHeight: 200, // Fixed height for image box
          border: "2px dashed #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          backgroundColor: selectedImage ? "transparent" : "#f4f4f4",
          marginBottom: 2,
        }}
      >
        {/* Delete Button */}

        <input
          type="file"
          accept="image/*"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
          }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              color: "#fff",
              fontSize: "18px",
              textAlign: "center",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.6)",
            }}
          >
            Click OR Drag to upload Image
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ImageUpload;

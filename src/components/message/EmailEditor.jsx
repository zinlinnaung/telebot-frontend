import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmailEditor = ({
  emailContent,
  setEmailContent,
  handleContentChange,
  subject,
  setSubject,
}) => {
  const handleSendEmail = async () => {
    // try {
    //   const response = await fetch("/send-email", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ content: emailContent }),
    //   });
    //   if (response.ok) {
    //     alert("Email sent successfully!");
    //   } else {
    //     alert("Failed to send email.");
    //   }
    // } catch (error) {
    //   console.error("Error sending email:", error);
    // }
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: "700px" }}>
        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <ReactQuill
          value={emailContent}
          onChange={handleContentChange}
          style={{
            height: "30vh",
            marginBottom: "50px",
            width: "100%",
            maxWidth: "700px",
          }}
        />

        {/* <button onClick={handleSendEmail}>Send Email</button> */}
      </Box>
    </>
  );
};

export default EmailEditor;

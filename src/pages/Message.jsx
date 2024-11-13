import React from "react";
import { Paper, Box, Card, CardContent, Typography } from "@mui/material";

const Message = () => {
  // Example data for user counts (you can replace this with actual data from your app)
  const userCounts = {
    messenger: 1200,
    viber: 800,
    telegram: 1500,
    shop: 3500,
  };

  return (
    <Paper
      sx={{
        flex: 1,
        overflow: "auto",
        p: "2rem",
        display: "flex",
        flexDirection: "column", // Ensures the cards are stacked on top of each other vertically
        alignItems: "center",
      }}
    >
      {/* Box for the 4 cards at the top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Space between cards
          width: "100%", // Ensure the Box takes up the full width
          mb: 4, // Margin at the bottom for spacing between the cards and the rest of the content
          flexWrap: "wrap", // Allows the cards to wrap if the screen size is small
          gap: 2, // Space between the cards when wrapping
        }}
      >
        {/* Messenger Card */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Messenger
              </Typography>
              <Typography variant="h5" component="div">
                {userCounts.messenger}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Viber Card */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Viber
              </Typography>
              <Typography variant="h5" component="div">
                {userCounts.viber}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Telegram Card */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Telegram
              </Typography>
              <Typography variant="h5" component="div">
                {userCounts.telegram}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Shop Card */}
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                Shop
              </Typography>
              <Typography variant="h5" component="div">
                {userCounts.shop}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Paper>
  );
};

export default Message;

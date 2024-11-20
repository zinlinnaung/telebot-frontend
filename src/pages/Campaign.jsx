import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Paper,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import ItemCard from "../components/winningRatio/ItemCard";
import SearchBar from "../components/common/SearchBar";

const StyledTableCell = styled(TableCell)(({ theme, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    width: width ? width : "200px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: width ? width : "200px",
  },
  textAlign: "center",
}));

const Campaign = () => {
  const userCounts = {
    messenger: 1200,
    viber: 800,
    telegram: 1500,
    sms: 3500,
    email: 200,
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [campaigns, setCampaigns] = useState([]); // Store campaigns dynamically
  const [campaign, setCampaign] = useState({
    id: null,
    name: "",
    description: "",
  });

  const handleSearch = (query) => {
    console.log("Search:", query);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaign((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveCampaign = () => {
    const newCampaign = {
      id: campaigns.length + 1,
      name: campaign.name,
      description: campaign.description,
    };

    setCampaigns((prevState) => [...prevState, newCampaign]);
    setCampaign({ id: null, name: "", description: "" }); // Reset form
    handleDialogClose();
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns((prevState) => prevState.filter((c) => c.id !== id));
  };

  return (
    <Paper
      sx={{
        flex: 1,
        overflow: "auto",
        p: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Add Campaign
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {Object.keys(userCounts).map((key) => (
          <Box key={key} sx={{ flex: 1, minWidth: 200 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <Typography variant="h5" component="div">
                  {userCounts[key]}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ width: "100%" }}>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "60vh", // Scrollable container for body
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
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
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
          >
            <SearchBar onSearch={handleSearch} />
          </Box>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell width={"10%"}>ID</StyledTableCell>
                <StyledTableCell width={"25%"}>Name</StyledTableCell>
                <StyledTableCell width={"25%"}>Description</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns.map((row) => (
                <ItemCard
                  key={row.id}
                  data={{
                    id: row.id,
                    name: row.name,
                    description: row.description,
                  }}
                  handleDeleteCampaign={handleDeleteCampaign}
                />
                // <TableRow key={row.id}>
                //   <StyledTableCell>{row.id}</StyledTableCell>
                //   <StyledTableCell>{row.name}</StyledTableCell>
                //   <StyledTableCell>{row.description}</StyledTableCell>
                //   <StyledTableCell>
                //     <Button
                //       variant="outlined"
                //       color="error"
                //       onClick={() => handleDeleteCampaign(row.id)}
                //     >
                //       Delete
                //     </Button>
                //   </StyledTableCell>
                // </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add Campaign</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={campaign.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={campaign.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSaveCampaign} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Campaign;

import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [campaigns, setCampaigns] = useState([]); // Store campaigns dynamically
  const [campaign, setCampaign] = useState({
    id: null,
    name: "",
    description: "",
  });

  // Fetch campaigns on component mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVICE_BASE_URL + "/campaigns"
      );
      setCampaigns(response.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

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

  const handleSaveCampaign = async () => {
    try {
      const newCampaign = {
        name: campaign.name,
        description: campaign.description,
      };

      // Send POST request to create a new campaign
      await axios.post(
        import.meta.env.VITE_SERVICE_BASE_URL + "/campaigns/create",
        newCampaign
      );
      fetchCampaigns(); // Refresh campaign list
      setCampaign({ id: null, name: "", description: "" }); // Reset form
      handleDialogClose();
    } catch (error) {
      console.error("Error saving campaign:", error);
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      // Send DELETE request to remove the campaign
      await axios.delete(
        import.meta.env.VITE_SERVICE_BASE_URL + `/campaigns/${id}`
      );
      fetchCampaigns(); // Refresh campaign list
    } catch (error) {
      console.error("Error deleting campaign:", error);
    }
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
        {/* Add your userCounts component here */}
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <SearchBar onSearch={handleSearch} />
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

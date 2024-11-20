import React, { useState } from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleSearch = () => {
    if (onSearch) onSearch(searchTerm);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "4px 8px",
        m: 2,
        width: "100%",
        maxWidth: "400px",
        // alignSelf: "flex-end",
      }}
    >
      <TextField
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          //   disableInjectingGlobalStyles: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "gray" }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          flex: 1,
          "& .MuiInputBase-input": {
            padding: "8px",
          },
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") handleSearch();
        }}
      />
    </Box>
  );
};

export default SearchBar;

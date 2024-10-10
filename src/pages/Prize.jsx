import { Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import PrizeCard from "../components/prize/PrizeCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useQuery } from "react-query";
import useAxios from "../hooks/useAxios";
import PrizeModal from "../components/prize/PrizeModal";

const Prize = () => {
  const [open, setOpen] = useState(false);
  const api = useAxios();

  const { data } = useQuery("prize-list", async () => {
    const response = await api.get("/api/prize");
    return response.data;
  });

  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          mb: "-2rem",
          width: "fit-content",
          borderRadius: "50%",
          ml: "auto",
          mr: "3rem",
          cursor: "pointer",
          zIndex: 10,
          display: "none",
        }}
        onClick={() => setOpen(true)}
      >
        <AddCircleIcon
          sx={{ color: "primary.main", fontSize: "4rem", mb: "-7px" }}
        />
      </Box>
      <Paper sx={{ flex: 1, overflow: "auto", pt: "2rem" }}>
        <PrizeModal open={open} setOpen={setOpen} isEdit={false} />
        <Box
          sx={{
            px: "1rem",
            py: "3rem",
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            columnGap: "1rem",
            rowGap: "4rem",
          }}
        >
          {data &&
            data?.map((data, index) => <PrizeCard key={index} data={data} />)}
        </Box>
      </Paper>
    </>
  );
};

export default Prize;

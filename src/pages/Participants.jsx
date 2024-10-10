import React from "react";
import DatePickerCard from "../components/common/DatePicker";
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../components/common/NoRowOverlay";
import { Paper } from "@mui/material";
import { useQuery } from "react-query";
import useAxios from "../hooks/useAxios";
import axios from "axios";

const Participants = () => {
  const api = useAxios();
  const { data } = useQuery("participants", async () => {
    const response = await api.get("/api/participant");
    return response.data;
  });

  const columns = [
    { field: "id", headerName: "ID", hide: true, minWidth: 90 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.1,
      minWidth: 200,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.1,
      minWidth: 200,
    },
  ];
  return (
    <Paper
      sx={{
        width: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <DatePickerCard url="/api/participant/export" />
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <DataGrid
          columns={columns}
          slots={{
            toolbar: GridToolbar,
            noRowsOverlay: NoRowOverlay,
          }}
          rows={data ?? []}
          pagination
          pageSizeOptions={[25, 50, 100]}
        />
      </Box>
    </Paper>
  );
};

export default Participants;

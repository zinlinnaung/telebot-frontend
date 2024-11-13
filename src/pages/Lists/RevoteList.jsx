import React from "react";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import NoRowOverlay from "../../components/common/NoRowOverlay";

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    width: 350,
    flex: 0.1,
    renderCell: (params) => (
      <Typography>{params.row.participants?.name}</Typography>
    ),
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 350,
    flex: 0.1,
    renderCell: (params) => (
      <Typography>{params.row.participants?.phone}</Typography>
    ),
  },
  {
    field: "prize",
    headerName: "Prize",
    width: 350,
    flex: 0.1,
    renderCell: (params) => <Typography>{params.row.prizes?.name}</Typography>,
  },
  { field: "reason", headerName: "Reason", width: 350, flex: 0.1 },
];

const RevoteList = () => {
  const api = useAxios();

  const { data } = useQuery("prizes", async () => {
    const response = await api.get("api/participant/revote");
    return response.data;
  });

  return (
    <Box sx={{ width: "100%", height: 350, flex: 1 }}>
      {/* <DataGrid
        rows={data ?? []}
        columns={columns}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: NoRowOverlay,
        }}
        sx={{ "--DataGrid-overlayHeight": "300px" }}
      /> */}
    </Box>
  );
};

export default RevoteList;

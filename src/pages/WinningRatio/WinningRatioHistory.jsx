import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useQuery } from "react-query";
import NoRowOverlay from "../../components/common/NoRowOverlay";
import useAxios from "../../hooks/useAxios";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "originalPrizeId", headerName: "Prize ID" },
  {
    field: "photo",
    headerName: "Image",
    sortable: false,
    filterable: false,
    minWidth: 100,
    flex: 0.1,
    renderCell: (params) => (
      <Box
        component="img"
        src={import.meta.env.VITE_SERVICE_BASE_URL + params.row.photoUrl}
        sx={{ width: "3rem" }}
      />
    ),
  },
  { field: "name", headerName: "Name", width: 350, flex: 0.1 },
  {
    field: "startDate",
    headerName: "From",
    width: 350,
    flex: 0.1,
    renderCell: (params) => (
      <Typography>
        {new Date(params.row.startDate).toLocaleDateString()}
      </Typography>
    ),
  },
  {
    field: "endDate",
    headerName: "To",
    width: 350,
    flex: 0.1,
    renderCell: (params) => (
      <Typography>
        {new Date(params.row.endDate).toLocaleDateString()}
      </Typography>
    ),
  },
  { field: "quantity", headerName: "Quantity", width: 350, flex: 0.1 },
  { field: "winningRatio", headerName: "Winning Ratio", width: 350, flex: 0.1 },
  {
    field: "defaultWinningRatio",
    headerName: "Default Winning Ratio",
    width: 350,
    flex: 0.1,
  },
];

const WinningRatioHistory = () => {
  const api = useAxios();

  const { data } = useQuery("prize-history-list", async () => {
    const response = await api.get("/api/prize/historys");
    return response.data;
  });

  return (
    <Box sx={{ width: "100%", height: 350, flex: 1 }}>
      <DataGrid
        rows={data ?? []}
        columns={columns}
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: NoRowOverlay,
        }}
        sx={{ "--DataGrid-overlayHeight": "300px" }}
      />
    </Box>
  );
};

export default WinningRatioHistory;

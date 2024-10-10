import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import NoRowOverlay from "../../components/common/NoRowOverlay";
import useAxios from "../../hooks/useAxios";

const columns = [
  { field: "id", headerName: "ID" },
  // { field: "name", headerName: "Prize", width: 350, flex: 0.1 },
  {
    field: "name",
    headerName: "Prize",
    width: 350,
    flex: 0.1,
    renderCell: (params) => <span>{params.row.prizes.name}</span>,
  },
  // { field: "winCount", headerName: "Win Count", width: 350, flex: 0.1 },
  {
    field: "winCount",
    headerName: "Win Count",
    width: 350,
    flex: 0.1,
    renderCell: (params) => <span>{params.row.prizes.winCount}</span>,
  },
  {
    field: "created_at",
    headerName: "Created At",
    width: 350,
    flex: 0.1,
    renderCell: (params) => (
      <Typography>
        {new Date(params.row.created_at).toLocaleDateString()}
      </Typography>
    ),
  },
];

const WinnerDetails = () => {
  const { id } = useParams();
  const api = useAxios();

  const { data } = useQuery("winner-details", async () => {
    const response = await api.get(`/api/participant/${id}`);
    return response.data;
  });

  return (
    <>
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <EmojiEventsRoundedIcon sx={{ color: "primary.main", fontSize: 35 }} />
        <Typography variant="h5">{data?.name}</Typography>
      </Stack>
      <Box sx={{ width: "100%", height: 500, flex: data?.length ? 1 : null }}>
        <DataGrid
          // rows={data?.prize ?? []}
          rows={data?.ParticepentPrize ?? []}
          columns={columns}
          disableRowSelectionOnClick
          slots={{
            // toolbar: GridToolbar,
            noRowsOverlay: NoRowOverlay,
          }}
          sx={{ "--DataGrid-overlayHeight": "300px" }}
        />
      </Box>
    </>
  );
};

export default WinnerDetails;

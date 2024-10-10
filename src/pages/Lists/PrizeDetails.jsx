import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import NoRowOverlay from "../../components/common/NoRowOverlay";
import useAxios from "../../hooks/useAxios";
import ViewDetailButton from "../../components/common/ViewDetailButton";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const PrizeDetails = () => {
  const { id } = useParams();
  const api = useAxios({ autoSnackbar: true });
  const queryClient = useQueryClient();

  const { data: prizeWinner } = useQuery("winner-details", async () => {
    const response = await api.get(`/api/prize/${id}`);
    return response.data.ParticepentPrize.filter((item) => !item.revoke);
  });

  // const data = prizeWinner && prizeWinner?.filter((item) => !item.revoke);

  const { mutate } = useMutation(
    async ({ pId, input }) => {
      await api.patch(`/api/participant/${pId}/revote/${id}`, {
        reason: input,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["winner-details"] });
      },
    }
  );

  const showSwal = (pId) => {
    withReactContent(Swal).fire({
      title: <p>Please define the reason to revoke</p>,
      input: "text",
      showCancelButton: true,
      preConfirm: () => {
        const input = Swal.getInput()?.value;
        mutate({ pId, input });
      },
    });
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      width: 350,
      flex: 0.1,
      renderCell: (params) => (
        <Typography>{params.row.participants.name}</Typography>
      ),
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 350,
      flex: 0.1,
      renderCell: (params) => (
        <Typography>{params.row.participants.phone}</Typography>
      ),
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
    {
      field: "actions",
      headerName: "Actions",
      width: 350,
      flex: 0.1,
      renderCell: ({ id }) => (
        <div onClick={() => showSwal(id)}>
          <ViewDetailButton name="Revoke" />
        </div>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" alignItems="center" gap={1} mb={2}>
        <EmojiEventsRoundedIcon sx={{ color: "primary.main", fontSize: 35 }} />
        <Typography variant="h5">{prizeWinner && prizeWinner[0]?.prizes?.name}</Typography>
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: 350,
          flex: prizeWinner?.length ? 1 : null,
        }}
      >
        <DataGrid
          rows={prizeWinner ?? []}
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

export default PrizeDetails;

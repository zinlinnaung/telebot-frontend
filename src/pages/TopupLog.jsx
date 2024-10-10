import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import NoRowOverlay from "../components/common/NoRowOverlay";
import { useMutation, useQuery } from "react-query";
import useAxios from "../hooks/useAxios";
import { v4 as uuidv4 } from "uuid";

const TopupLog = () => {
  const api = useAxios();
  //   const generatedID = uuidv4();

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "ph_no",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{ color: params.row.status === "success" ? "green" : "red" }}
        >
          {params.row.status}
        </Typography>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => (
        <Typography>
          {new Date(params.row.created_at).toLocaleString()}
        </Typography>
      ),
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <Button
    //       disabled={params.row.status === "success"}
    //       size="small"
    //       variant="outlined"
    //       color="secondary"
    //     >
    //       Retry
    //     </Button>
    //   ),
    // },
  ];

  //   const { mutate: topup } = useMutation(async () => {
  //     return await api.post("/api/my", {
  //       keyword: import.meta.env.VITE_TOPUP_KEYWORD,
  //       service_name: import.meta.env.VITE_UAT_TOPUP_SERVICE_NAME,
  //       to: "959447032756",
  //       id: generatedID,
  //     });
  //   });

  const { data } = useQuery("topup-logs", async () => {
    return await api.get("/api/my/topuplogs").then((res) => res.data);
  });

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          flex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 350,
            flex: 1,
          }}
        >
          <DataGrid
            rows={data ?? []}
            columns={columns}
            disableRowSelectionOnClick
            slots={{
              // toolbar: GridToolbar,
              noRowsOverlay: NoRowOverlay,
            }}
            sx={{ "--DataGrid-overlayHeight": "300px" }}
          />
        </Box>
      </Paper>
    </>
  );
};

export default TopupLog;

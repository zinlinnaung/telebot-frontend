import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import NoRowOverlay from "../../components/common/NoRowOverlay";
import ViewDetailButton from "../../components/common/ViewDetailButton";
import useAxios from "../../hooks/useAxios";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Prize", width: 350, flex: 0.1 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    minWidth: 150,
    flex: 0.1,
    renderCell: (params) => (
      <Link to={`${params.row.id}`}>
        <ViewDetailButton />
      </Link>
    ),
  },
];

const PrizesList = () => {
  const api = useAxios();

  const { data } = useQuery("prizes", async () => {
    const response = await api.get("api/prize");
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

export default PrizesList;

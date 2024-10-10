import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  TableCell,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import WinningRatioModal from "./WinningRatioModal";
import { QueryClient, useMutation } from "react-query";
import useAxios from "../../hooks/useAxios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  textAlign: "center",
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fff",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ItemCard = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <WinningRatioModal open={open} setOpen={setOpen} /> */}
      <StyledTableRow
      // onClick={() => navigate("/dashboard/agent-activities/name")}
      >
        <StyledTableCell component="th" scope="row">
          {data.id}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <Box
            component="img"
            src={import.meta.env.VITE_SERVICE_BASE_URL + data.photoUrl}
            sx={{ width: "3rem" }}
          />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {data.name}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {new Date(data.startDate).toLocaleDateString()}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {new Date(data.endDate).toLocaleDateString()}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {data.quantity}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {data.winningRatio}
        </StyledTableCell>
        <StyledTableCell>
          <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
            Edit
          </Button>
        </StyledTableCell>
        {/* <EditWinningRatioModal open={open} setOpen={setOpen} /> */}
        <WinningRatioModal
          open={open}
          setOpen={setOpen}
          edit={true}
          data={data}
        />
      </StyledTableRow>
    </>
  );
};

export default ItemCard;

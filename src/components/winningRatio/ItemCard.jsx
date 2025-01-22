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
import { useNavigate } from "react-router-dom";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

const StyledTableCell = styled(TableCell)(({ theme, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    maxWidth: width ? width : "25%", // Conditional width for "id" column
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: width ? width : "25%", // Conditional width for "id" column
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

const ItemCard = ({ data, handleDeleteCampaign }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* <WinningRatioModal open={open} setOpen={setOpen} /> */}
      <StyledTableRow
      // onClick={() => navigate("/dashboard/agent-activities/name")}
      >
        <StyledTableCell width={"10%"} component="th" scope="row">
          {data.id}
        </StyledTableCell>

        <StyledTableCell width={"25%"} component="th" scope="row">
          {data.name}
        </StyledTableCell>
        <StyledTableCell width={"25%"} component="th" scope="row">
          {data.description}
        </StyledTableCell>
        {/* <StyledTableCell component="th" scope="row">
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
        </StyledTableCell> */}
        <StyledTableCell>
          <Button
            variant="contained"
            size="small"
            sx={{ color: "white" }}
            onClick={() => navigate(`/campaign/${data.id}`)}
          >
            <BorderColorRoundedIcon sx={{ fontSize: "1.3rem" }} />
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ marginLeft: 2, color: "white" }}
            onClick={() => handleDeleteCampaign(data.id)}
          >
            <DeleteForeverRoundedIcon sx={{ fontSize: "1.3rem" }} />
          </Button>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default ItemCard;

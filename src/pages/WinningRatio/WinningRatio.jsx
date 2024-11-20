import styled from "@emotion/styled";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React, { useState } from "react";
import ItemCard from "../../components/winningRatio/ItemCard";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "react-query";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  textAlign: "center",
  padding: "1rem 0",
}));

const WinningRatio = () => {
  const [open, setOpen] = useState(false);
  const api = useAxios();

  const { data } = useQuery("prize-list", async () => {
    const response = await api.get("/api/prize");
    return response.data;
  });

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Winning Ratio</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((data) => (
              <ItemCard key={data.id} data={data} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WinningRatio;

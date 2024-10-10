import { Badge, Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import PrizeModal from "./PrizeModal";
import DeletePrize from "./DeletePrize";
import StatusModal from "./StatusModal";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/atom";
import { jwtDecode } from "jwt-decode";

const PrizeCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const auth = useRecoilValue(authAtom);
  const role = jwtDecode(auth.access_token).role;

  return (
    <Paper
      sx={{
        p: "1rem",
        bgcolor: "secondary.light",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", columnGap: "1rem" }}>
          <Box sx={{ mt: "-2rem" }}>
            <Box
              component="img"
              src={import.meta.env.VITE_SERVICE_BASE_URL + data.photoUrl}
              alt="Prize"
              sx={{ width: "3rem" }}
            />
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>{data.name}</Typography>
        </Box>
        {role === "Admin" && (
          <Stack direction="row">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "primary.main",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                mt: "-2rem",
                cursor: "pointer",
              }}
              onClick={() => setOpen(true)}
            >
              <EditIcon
                sx={{
                  color: "#fff",
                  display: "block",
                  fontSize: "1.3rem",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: data.isActive ? "red" : "green",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                mt: "-2rem",
                ml: ".5rem",
                cursor: "pointer",
              }}
              onClick={() => setOpenStatusModal(true)}
            >
              {data.isActive ? (
                <BlockIcon
                  sx={{
                    color: "#fff",
                    display: "block",
                    fontSize: "1.4rem",
                  }}
                />
              ) : (
                <CheckIcon
                  sx={{
                    color: "#fff",
                    display: "block",
                    fontSize: "1.4rem",
                  }}
                />
              )}
            </Box>
          </Stack>
        )}

        <PrizeModal data={data} open={open} setOpen={setOpen} isEdit={true} />
        {/* <DeletePrize
          data={data}
          open={isDeleteModalOpen}
          setOpen={setDeleteModalOpen}
        /> */}
        <StatusModal
          data={data}
          open={openStatusModal}
          setOpen={setOpenStatusModal}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "1rem",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Total Quantity</Typography>
          <Typography>{data.totalQuantity}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Status</Typography>
          <Typography color={data.isActive ? "green" : "red"}>
            {data.isActive ? "active" : "inactive"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Default Winning Ratio</Typography>
          <Typography>{data.defaultWinningRatio}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PrizeCard;

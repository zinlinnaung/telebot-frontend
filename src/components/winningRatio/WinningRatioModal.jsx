import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// import { DatePicker } from "antd";
import React, { useRef, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import useAxios from "../../hooks/useAxios";
import { LoadingButton } from "@mui/lab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const WinningRatioModal = ({ open, setOpen, edit = false, data }) => {
  // const [selectedImage, setSelectedImage] = useState(null);
  // const inputRef = useRef(null);

  const [editPrize, setEditPrize] = useState({});
  const api = useAxios({ autoSnackbar: true });
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(
    async () => {
      await api.patch(`/api/prize/${data?.id}`, editPrize);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["prize-list"] });
      },
    }
  );

  const onSubmitHandler = () => {
    mutate();
    setOpen(false);
    setEditPrize({});
  };

  // const handleFileChange = (e) => {
  //   const previewImg = URL.createObjectURL(e.target.files[0]);
  //   setSelectedImage(previewImg);
  // };
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={onSubmitHandler}>
        <Box sx={{ textAlign: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <Avatar
              sx={{
                mx: "auto",
                width: "5rem",
                height: "5rem",
                cursor: "pointer",
              }}
              onClick={() => inputRef.current.click()}
            >
              {selectedImage ? (
                <Box
                  component="img"
                  src={selectedImage}
                  sx={{ objectFit: "cover", width: "4rem" }}
                />
              ) : (
                <AddPhotoAlternateIcon fontSize="large" />
              )}
            </Avatar>
            <input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleFileChange}
            /> */}
            <Typography sx={{ fontSize: "1.5rem", mb: "1rem" }}>
              {data?.name}
            </Typography>
            {/* <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
            <DatePicker
              format="mm-dd-yyyy"
              value={editPrize.startDate ? editPrize.startDate : data.startDate}
              onChange={(date) => {
                setEditPrize({
                  ...editPrize,
                  startDate: new Date(date).toISOString(),
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  label="Start Date"
                  size="small"
                  required
                  fullWidth
                  sx={{ mt: "1rem" }}
                />
              )}
            />
            <DatePicker
              format="mm-dd-yyyy"
              value={editPrize.endDate ? editPrize.endDate : data.endDate}
              onChange={(date) => {
                setEditPrize({
                  ...editPrize,
                  endDate: new Date(date).toISOString(),
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  label="End Date"
                  size="small"
                  required
                  fullWidth
                  sx={{ mt: "1rem" }}
                />
              )}
            />
            <TextField
              type="number"
              size="small"
              fullWidth
              sx={{ mt: "1rem" }}
              label="Quantity"
              value={editPrize.quantity ? editPrize.quantity : data.quantity}
              onChange={(e) =>
                setEditPrize({ ...editPrize, quantity: e.target.value })
              }
              // inputProps={{ step: "0.0001", min: "0.0001" }}
              required
            />
            <TextField
              type="number"
              size="small"
              fullWidth
              sx={{ mt: "1rem" }}
              label="Winning Ratio"
              value={
                editPrize.winningRatio
                  ? editPrize.winningRatio
                  : data.winningRatio
              }
              onChange={(e) =>
                setEditPrize({ ...editPrize, winningRatio: e.target.value })
              }
              inputProps={{ step: "0.0001", min: "0.0001" }}
              required
            />

            <LoadingButton
              type="submit"
              loading={isLoading}
              sx={{
                bgcolor: "primary.main",
                color: "#fff",
                mt: "1rem",
                ":hover": {
                  bgcolor: "primary.hover",
                },
              }}
              // onClick={() => setOpen(false)}
            >
              Edit
            </LoadingButton>
          </LocalizationProvider>
        </Box>
      </Box>
    </Modal>
  );
};

export default WinningRatioModal;

import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Input,
  Modal,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useMutation, useQueryClient } from "react-query";
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
  borderRadius: 3,
};

const PrizeModal = ({ open, setOpen, data, isEdit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);
  const [prize, setPrize] = useState({
    name: "",
    totalQuantity: "",
    defaultWinningRatio: "",
    winningRatio: "",
    winningMessage: "",
    winningMessageMyanmar: "",
    isActive: true,
    file: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  });
  const [editPrize, setEditPrize] = useState({});
  const api = useAxios({ autoSnackbar: true });
  const queryClient = useQueryClient();

  const handleFileChange = (e) => {
    const previewImg = URL.createObjectURL(e.target.files[0]);
    setSelectedImage(previewImg);
    isEdit
      ? setEditPrize({ ...editPrize, file: e.target.files[0] })
      : setPrize({ ...prize, file: e.target.files[0] });
  };

  const handleOnChange = (e) => {
    isEdit
      ? setEditPrize({ ...editPrize, [e.target.name]: e.target.value })
      : setPrize({ ...prize, [e.target.name]: e.target.value });
  };

  const handleOnSwitch = (e) => {
    setEditPrize({ ...editPrize, isActive: e.target.checked });
  };

  const { isLoading: addLoading, mutate: add } = useMutation(
    async () => {
      await api.postForm("/api/prize", {
        ...prize,
        winningRatio: prize.defaultWinningRatio,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["prize-list"] });
      },
    }
  );

  const { isLoading: editLoading, mutate: edit } = useMutation(
    async () => {
      await api.patchForm(`/api/prize/${data?.id}`, editPrize);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["prize-list"] });
      },
    }
  );

  const handleOnSubmit = () => {
    isEdit ? edit() : add();

    setOpen(false);
    setSelectedImage(null);
    setPrize({
      name: "",
      totalQuantity: "",
      defaultWinningRatio: "",
      winningRatio: "",
      winningMessage: "",
      isActive: true,
      file: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form" onSubmit={handleOnSubmit}>
        <Avatar
          sx={{ mx: "auto", width: "5rem", height: "5rem", cursor: "pointer" }}
          onClick={() => inputRef.current.click()}
        >
          {selectedImage ? (
            <Box
              component="img"
              src={selectedImage}
              sx={{ objectFit: "cover", width: "4rem" }}
            />
          ) : isEdit ? (
            <Box
              component="img"
              src={import.meta.env.VITE_SERVICE_BASE_URL + data?.photoUrl}
              sx={{ objectFit: "cover", width: "4rem" }}
            />
          ) : (
            <AddPhotoAlternateIcon fontSize="large" />
          )}
        </Avatar>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleFileChange}
        />
        <Box sx={{ textAlign: "center" }}>
          <TextField
            name="name"
            type="text"
            size="small"
            fullWidth
            sx={{ mt: "1rem" }}
            label="Name"
            // value={prize.name}
            defaultValue={data?.name}
            onChange={handleOnChange}
            required
          />
          <TextField
            name="totalQuantity"
            type="number"
            size="small"
            fullWidth
            sx={{ mt: "1rem" }}
            label="Total Quantity"
            // value={prize.quantity}
            defaultValue={data?.totalQuantity}
            onChange={handleOnChange}
            required
          />
          <TextField
            name="defaultWinningRatio"
            type="number"
            size="small"
            fullWidth
            sx={{ mt: "1rem" }}
            label="Default Winning Ratio"
            // value={prize.winningRatio}
            defaultValue={data?.defaultWinningRatio}
            onChange={handleOnChange}
            inputProps={{ step: "0.0001", min: "0.0001" }}
            required
          />
          <TextField
            name="winningMessage"
            type="text"
            size="small"
            fullWidth
            sx={{ mt: "1rem" }}
            label="Winning Message"
            // value={prize.winningRatio}
            defaultValue={data?.winningMessage}
            onChange={handleOnChange}
            required
          />
          <TextField
            name="winningMessageMyanmar"
            type="text"
            size="small"
            fullWidth
            sx={{ mt: "1rem" }}
            label="Winning Message Myanmar"
            // value={prize.winningRatio}
            defaultValue={data?.winningMessageMyanmar}
            onChange={handleOnChange}
            required
          />

          <LoadingButton
            loading={isEdit ? editLoading : addLoading}
            type="submit"
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              mt: "1rem",
              ":hover": {
                bgcolor: "primary.hover",
              },
            }}
          >
            {isEdit ? "EDIT" : "ADD"}
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default PrizeModal;

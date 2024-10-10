import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import useAxios from "../../hooks/useAxios";

const DeletePrize = ({ open, setOpen, data }) => {
  const api = useAxios({ autoSnackbar: true });
  const queryClient = useQueryClient();

  const { isLoading, mutate: remove } = useMutation(
    async () => {
      await api.delete(`/api/prize/${data?.id}/delete`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["prize-list"] });
      },
    }
  );

  const handleDelete = () => {
    remove();
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Confirm Delete
        </Typography>
        <Typography variant="body1" paragraph>
          Are you sure you want to delete this item?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={() => setOpen(false)} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            {isLoading ? "Deleting" : "Delete"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeletePrize;

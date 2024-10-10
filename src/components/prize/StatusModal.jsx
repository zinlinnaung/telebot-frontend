import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQueryClient } from "react-query";
import { Box, Button, Modal, Typography } from "@mui/material";

const StatusModal = ({ data, open, setOpen }) => {
  const api = useAxios({ autoSnackbar: true });
  const queryClient = useQueryClient();
  //   const [open, setOpen] = useState(false);

  const { mutate } = useMutation(
    async () => {
      //   await api.delete(`/api/prize/${data?.id}/delete`);
      await api.patch(`/api/prize/${data?.id}`, {
        isActive: !data?.isActive,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["prize-list"] });
      },
    }
  );

  const handleDelete = () => {
    // remove();
    mutate();
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
          Confirm
        </Typography>
        <Typography variant="body1" paragraph>
          Are you sure to change the status of this item?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={() => setOpen(false)} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="success">
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StatusModal;

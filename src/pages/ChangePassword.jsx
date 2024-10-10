import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import  { useState } from "react";
import { useMutation, useQuery } from "react-query";
import useAxios from "../hooks/useAxios";

const ChangePassword = () => {
  const api = useAxios({ autoSnackbar: true });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const { data: user } = useQuery("user", async () => {
    return await api.get("/api/user/me").then((res) => res.data);
  });

  const { mutate: changePassword } = useMutation(
    async () => {
      return await api.patch(`/api/user/${user.id}/update-password`, {
        currentPassword: form.currentPassword,
        newPassword: form.confirmPassword,
      });
    },
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      },
    }
  );

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (form.newPassword === form.confirmPassword) {
      changePassword();
    } else {
      setError("The password confirmation does not match");
    }
  };

  return (
    <Paper
      sx={{
        flex: 1,
        overflow: "auto",
        p: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        elevation={3}
        component="form"
        onSubmit={onSubmitHandler}
        sx={{
          width: "50%",
          textAlign: "center",
          px: "2rem",
          py: "1rem",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold", mb: "1rem" }}>
            Change Your Password
          </Typography>
          <Typography sx={{ mb: "1rem" }}>
            Enter a new password below to change your password
          </Typography>
          <TextField
            name="currentPassword"
            type="password"
            label="Current Password"
            fullWidth
            size="small"
            required
            sx={{ mb: "1rem" }}
            value={form.currentPassword}
            onChange={onChangeHandler}
          />
          <TextField
            name="newPassword"
            type="password"
            label="New Password"
            fullWidth
            size="small"
            required
            sx={{ mb: "1rem" }}
            value={form.newPassword}
            onChange={onChangeHandler}
          />
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Your Password"
            fullWidth
            size="small"
            required
            sx={{ mb: "1rem" }}
            value={form.confirmPassword}
            onChange={onChangeHandler}
          />
          <Typography
            sx={{
              color: "secondary.main",
              textAlign: "left",
            }}
          >
            {error && error}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            type="submit"
            sx={{
              mx: "auto",
              backgroundColor: "primary.main",
              color: "white",
              ":hover": {
                backgroundColor: "primary.hover",
              },
            }}
          >
            Change Password
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default ChangePassword;

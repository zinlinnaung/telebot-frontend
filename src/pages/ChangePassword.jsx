import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import useAxios from "../hooks/useAxios";
import EmailEditor from "../components/message/EmailEditor";

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
      <EmailEditor />
    </Paper>
  );
};

export default ChangePassword;

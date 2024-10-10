import { LoadingButton } from "@mui/lab";
import {  Box, Container, TextField, Typography } from "@mui/material";
import  { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "react-query";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "../recoil/auth/atom";
import withAlert from "../recoil/snackbar/withAlert";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const auth = useRecoilValue(authAtom);
  const openAlert = useSetRecoilState(withAlert);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const { isLoading, mutate } = useMutation(
    (data) => {
      return axios.post(
        `${import.meta.env.VITE_SERVICE_BASE_URL}/api/authentication/i/login`,
        data,
        {
          validateStatus: function (status) {
            return status <= 500;
          },
        }
      );
    },
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setAuth(res.data);
          localStorage.setItem("citizens-i-auth", JSON.stringify(res.data));
          navigate("/");
        } else {
          openAlert({
            status: res.status,
            detail:
              typeof res.data.message === "string"
                ? res.data.message
                : res.data.message[0],
          });
        }
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(data);
  };

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [navigate, auth]);

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        backgroundColor: "#F4F7FA",
        display: "flex",
      }}
    >
      <Box
        flex={0.5}
        sx={{
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <Container
        maxWidth="xs"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        {/* <Avatar
          sx={{ m: 1, bgcolor: "primary.main", width: "60px", height: "60px" }}
        >
          <LockOutlinedIcon sx={{ width: "40px", height: "40px" }} />
        </Avatar> */}
        <Box component="img" sx={{width:"40%"}}  src="/logo.png" alt="logo" />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: "100%" }}
        >
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ marginTop: "20px", color: "white" }}
          >
            Email
          </Typography>
          <TextField
            value={data.email}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiInputBase-root:hover .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiInputBase-root.Mui-focused .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />

          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ marginTop: "10px", color: "white" }}
          >
            Password
          </Typography>
          <TextField
            value={data.password}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiInputBase-root:hover .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiInputBase-root.Mui-focused .MuiInputBase-input": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />

          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            sx={{
              mt: 4,
              mb: 2,
              backgroundColor: "transparent",
              boxShadow: "3px 3px 10px #888",
              border: "2px solid #fff",
              color: "white",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#8093f1",
                color: "#fff",
                boxShadow: "3px 3px 10px #555",
              },
            }}
            size="large"
          >
            Sign In
          </LoadingButton>

          <Link
            // sx={{
            //   float: "right",
            //   cursor: "pointer",
            //   color: "primary.main",
            //   textDecoration: "none",
            // }}
            style={{ color: "white" }}
          >
            Forget Password?
          </Link>
        </Box>
      </Container>
      <Box
        flex={0.5}
        sx={{
          backgroundColor: "secondary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </Box>
  );
};

export default Login;

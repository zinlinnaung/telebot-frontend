import { LoadingButton } from "@mui/lab";
import { Box, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import withAlert from "../recoil/snackbar/withAlert";

const SignUp = () => {
  const navigate = useNavigate();
  const openAlert = useSetRecoilState(withAlert);
  const [data, setData] = useState({
    telegramId: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { isLoading, mutate } = useMutation(
    (data) => {
      return axios.post(
        `${import.meta.env.VITE_SERVICE_BASE_URL}/api/authentication/i/signup`,
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
          openAlert({
            status: res.status,
            detail: "Sign up successful! Please log in.",
          });
          navigate("/login");
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
    if (data.password !== data.confirmPassword) {
      openAlert({
        status: 400,
        detail: "Passwords do not match.",
      });
      return;
    }
    mutate(data);
  };

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
        <Box component="img" sx={{ width: "40%" }} src="/logo.png" alt="logo" />
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ marginTop: "20px", color: "white" }}>
            Telegram ID
          </Typography>
          <TextField
            value={data.telegramId}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="telegramId"
            autoComplete="telegram-id"
            
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LoadingButton
                      onClick={() => {
                        // Implement your logic to get the Telegram ID
                        window.open("https://t.me/zla_test_bot", "_blank");
                      }}
                      variant="text" // Use text variant for a text-only button
                      size="small"
                      sx={{
                        color: "#11B5E4", // Text color
                        "&:hover": {
                          backgroundColor: "transparent", // No background on hover
                          color: "#0098B5", // Change color on hover if needed
                        },
                        padding: 0, // Remove padding
                        minWidth: 'auto', // Allow button to shrink to fit content
                      }}
                    >
                      Get ID
                    </LoadingButton>
                  </InputAdornment>
                ),
              }}
            
          />

          <Typography variant="subtitle2" fontWeight="bold" sx={{ marginTop: "10px", color: "white" }}>
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
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />

          <Typography variant="subtitle2" fontWeight="bold" sx={{ marginTop: "10px", color: "white" }}>
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
            autoComplete="new-password"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />

          <Typography variant="subtitle2" fontWeight="bold" sx={{ marginTop: "10px", color: "white" }}>
            Confirm Password
          </Typography>
          <TextField
            value={data.confirmPassword}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />

          <Typography variant="subtitle2" fontWeight="bold" sx={{ marginTop: "10px", color: "white" }}>
            Phone Number
          </Typography>
          <TextField
            value={data.phone}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="phone"
            autoComplete="tel"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />

          <Typography variant="subtitle2" fontWeight="bold" sx={{ marginTop: "10px", color: "white" }}>
            Address
          </Typography>
          <TextField
            value={data.address}
            onChange={handleOnChange}
            margin="normal"
            size="small"
            required
            fullWidth
            name="address"
            autoComplete="address"
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
              "& .MuiInputBase-input": {
                color: "black",
                fontSize: "14px",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
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
                backgroundColor: "#11B5E4",
                color: "#fff",
                boxShadow: "3px 3px 10px #555",
              },
            }}
            size="large"
          >
            Sign Up
          </LoadingButton>

          <Box sx={{ display: "flex", justifyContent: "center", color: "white", marginTop: "10px" }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
                Log In
              </Link>
            </Typography>
          </Box>
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

export default SignUp;

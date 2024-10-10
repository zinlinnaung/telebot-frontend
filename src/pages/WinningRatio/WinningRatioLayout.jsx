import { Box, Button, Paper, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../theme";

const WinningRatioLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = location.pathname;
  useEffect(() => {
    if (activePath === "/winning-ratio") {
      navigate("/winning-ratio");
    }
  }, [navigate, activePath]);

  return (
    <Paper
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        flex: 1,
      }}
    >
      <Stack direction="row" gap={2} mb={2}>
        <Box
          sx={{
            borderBottom:
              activePath === "/winning-ratio"
                ? `3px solid ${theme.palette.secondary.main}`
                : "none",
          }}
        >
          <Link to=".">
            <Button variant="text" color="secondary">
              Winning Ratio
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            borderBottom: activePath.includes("/winning-ratio/history")
              ? `3px solid ${theme.palette.secondary.main}`
              : "none",
          }}
        >
          <Link to="history">
            <Button variant="text" color="secondary">
              Winning Ratio History
            </Button>
          </Link>
        </Box>
      </Stack>
      <Outlet />
    </Paper>
  );
};

export default WinningRatioLayout;

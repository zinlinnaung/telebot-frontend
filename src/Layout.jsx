import  { useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Drawer,
  Paper,
  Typography,
} from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StorefrontIcon from "@mui/icons-material/Storefront";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
// import useAxios from "./hooks/useAxios";
import PercentIcon from "@mui/icons-material/Percent";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useRecoilValue, useSetRecoilState } from "recoil";
import authAtom from "./recoil/auth/atom";
import { jwtDecode } from "jwt-decode";
import KeyIcon from "@mui/icons-material/Key";
import Logo from './assets/logo.png'

const Layout = () => {
  // const api = useAxios();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [state, setState] = useState(false);
  const auth = useRecoilValue(authAtom);
  const setAuth = useSetRecoilState(authAtom);
  const role = "Admin";

  const navs =
    role === "Admin"
      ? [
          // {
          //   name: "Dashboard",
          //   route: "/dashboard",
          //   icon: <DashboardIcon sx={{ color: "primary.main" }} />,
          // },
          {
            name: "Participants",
            route: "/participants",
            icon: <GroupOutlinedIcon sx={{ color: "primary.main" }} />,
          },
          // {
          //   name: "Prizes",
          //   route: "/prizes",
          //   icon: <StorefrontIcon sx={{ color: "primary.main" }} />,
          // },
          // {
          //   name: "Winning Ratio",
          //   route: "/winning-ratio",
          //   icon: <PercentIcon sx={{ color: "primary.main" }} />,
          // },
          // {
          //   name: "Spin Result",
          //   route: "/spin-result",
          //   icon: (
          //     <FormatListBulletedOutlinedIcon sx={{ color: "primary.main" }} />
          //   ),
          // },
          // {
          //   name: "Topup Logs",
          //   route: "/topup-logs",
          //   icon: (
          //     <PhoneIphoneIcon sx={{ color: "primary.main" }} />
          //   ),
          // },
          {
            name: "Change Password",
            route: "/change-password",
            icon: <KeyIcon sx={{ color: "primary.main" }} />,
          },
        ]
      : [
          // {
          //   name: "Dashboard",
          //   route: "/dashboard",
          //   icon: <DashboardIcon sx={{ color: "primary.main" }} />,
          // },
          {
            name: "Participants",
            route: "/participants",
            icon: <GroupOutlinedIcon sx={{ color: "primary.main" }} />,
          },
          {
            name: "Prizes",
            route: "/prizes",
            icon: <StorefrontIcon sx={{ color: "primary.main" }} />,
          },
          {
            name: "Change Password",
            route: "/change-password",
            icon: <KeyIcon sx={{ color: "primary.main" }} />,
          },
        ];

  const handleLogout = () => {
    localStorage.removeItem("citizens-i-auth");
    setAuth(null);
    navigate("/login");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #00F6ED 50%, #0D519D 50%)",
        height: "100vh",
        position: "relative",
        zIndex: 0,
        p: { md: "1rem" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        color: "#fff",
      }}
    >
      <Box sx={{ display: { md: "none" } }}>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon sx={{ color: "#fff" }} />
        </Button>
        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          <Paper
            elevation={3}
            sx={{
              bgcolor: "#fff",
              // width: "20%",
              p: "1rem",
              // mr: { md: "1rem" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              sx={{
                mx: "auto",
                display: "block",
                cursor: "pointer",
                width: { xs: "1rem", md: "auto" },
              }}
              onClick={() => navigate("/")}
            />
            <Divider
              sx={{ mt: { md: "1rem" }, mb: { xs: "1rem", md: "2rem" } }}
            />
            {navs.map((nav, index) => (
              <Link
                style={{ textDecoration: "none" }}
                to={nav.route}
                key={index}
              >
                <Paper
                  elevation={pathname.includes(nav.route) ? 3 : 0}
                  sx={{
                    px: "10px",
                    py: "10px",
                    mb: "1rem",
                    bgcolor: pathname.includes(nav.route) && "#EC008C",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    {nav.icon}
                    <Typography
                      sx={{
                        color: pathname.includes(nav.route)
                          ? "#fff"
                          : "secondary.main",
                        fontWeight: pathname.includes(nav.route)
                          ? "bold"
                          : null,
                        userSelect: "none",
                        display: { xs: "none", md: "block" },
                      }}
                    >
                      {nav.name}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            ))}
            {/* <Box sx={{ flex: 1 }} /> */}
            <Box
              elevation={3}
              onClick={handleLogout}
              sx={{
                px: "10px",
                py: "10px",
                mt: "auto",
                cursor: "pointer",
                bgcolor: "#fff",
                width: "100%",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <ExitToAppIcon sx={{ color: "primary.main" }} />
                <Typography
                  sx={{
                    color: "secondary.main",
                    textTransform: "none",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  Logout
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Drawer>
      </Box>

      <Paper
        elevation={3}
        sx={{
          bgcolor: "#fff",
          width: "20%",
          p: "1rem",
          display: { md: "flex", xs: "none" },
          flexDirection: "column",
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          sx={{
            mx: "auto",
            display: "block",
            cursor: "pointer",
            width: { xs: "3rem", md: "40%" },
          }}
          onClick={() => navigate("/")}
        />
        <Divider sx={{ mt: { md: "1rem" }, mb: { xs: "1rem", md: "2rem" } }} />
        {navs.map((nav, index) => (
          <Link style={{ textDecoration: "none" }} to={nav.route} key={index}>
            <Paper
              elevation={pathname.includes(nav.route) ? 3 : 0}
              sx={{
                px: "10px",
                py: "10px",
                mb: "1rem",
                bgcolor: pathname.includes(nav.route) && "#EC008C",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  columnGap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {nav.icon}
                <Typography
                  sx={{
                    color: pathname.includes(nav.route)
                      ? "#fff"
                      : "secondary.main",
                    fontWeight: pathname.includes(nav.route) ? "bold" : null,
                    userSelect: "none",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  {nav.name}
                </Typography>
              </Box>
            </Paper>
          </Link>
        ))}
        {/* <Box sx={{ flex: 1 }} /> */}
        <Box
          elevation={3}
          onClick={handleLogout}
          sx={{
            px: "10px",
            py: "10px",
            mt: "auto",
            cursor: "pointer",
            bgcolor: "#fff",
            width: "100%",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              columnGap: "0.5rem",
              alignItems: "center",
            }}
          >
            <ExitToAppIcon sx={{ color: "primary.main" }} />
            <Typography
              sx={{
                color: "secondary.main",
                textTransform: "none",
                display: { xs: "none", md: "block" },
              }}
            >
              Logout
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{
          px: "1rem",
          width: "100%",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          py: { xs: "1rem", md: 0 },
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "1rem",
          }}
        >
          <Box>
            {navs.map(
              (nav, index) =>
                pathname.includes(nav.route) && (
                  <Box key={index}>
                    <Breadcrumbs sx={{ color: "#fff" }} aria-label="breadcrumb">
                      <Link href="/">
                        <HomeIcon sx={{ color: "#fff" }} />
                      </Link>
                      <Typography>{nav.name}</Typography>
                    </Breadcrumbs>
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        mt: "1rem",
                      }}
                    >
                      {nav.name}
                    </Typography>
                  </Box>
                )
            )}
          </Box>

          {/* <Box
            sx={{
              mr: "1rem",
              display: "flex",
              flexDirection: { xs: "column",md: "row" },
              columnGap: "0.5rem",
              alignItems: "center",
            }}
          >
            <AccountCircleIcon
              sx={{ fontSize: { xs: "1.5rem", md: "2.5rem" } }}
            />
            <Typography sx={{ fontWeight: "bold" }}>Zin Lin Aung</Typography>
          </Box> */}
        </Box>

        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;

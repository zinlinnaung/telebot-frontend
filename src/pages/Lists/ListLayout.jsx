import { Box, Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import DatePickerCard from "../../components/common/DatePicker";
import { theme } from "../../theme";

const ListLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [url, setUrl] = useState("");
  // const isMounted = useRef(true);

  // useEffect(() => {
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath === "/sent-message") {
      navigate("/sent-message/facebook-message");
    }
  }, [navigate]);

  const activePath = location.pathname;

  useEffect(() => {
    if (activePath === "/sent-message") {
      navigate("/sent-message/facebook-message");
    }
  }, [navigate, activePath]);

  useEffect(() => {
    let newUrl = "/api/prize/export"; // Default URL

    if (activePath === "/sent-message/facebook-message") {
      newUrl = "/api/participant/winners";
    } else if (activePath.includes("/spin-result/rewards-list")) {
      newUrl = `/api/prize/${params.id}`;
    } else if (activePath === "/sent-message/revote-list") {
      newUrl = `/api/participant/revote`;
    }

    setUrl(newUrl);
  }, [activePath]);

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
      {/* <DatePickerCard url={url} /> */}

      <Stack direction="row" gap={2} mb={2}>
        <Box
          sx={{
            borderBottom: activePath.includes("/sent-message/facebook-message")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <Link to="facebook-message">
            <Button variant="text" color="primary">
              FaceBook
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            borderBottom: activePath.includes("/sent-message/rewards-list")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <Link to="rewards-list">
            <Button variant="text" color="primary">
              Viber
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            borderBottom: activePath.includes("/sent-message/revote-list")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <Link to="revote-list">
            <Button variant="text" color="primary">
              Telegram
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            borderBottom: activePath.includes("/sent-message/revote-list")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <Link to="sms-message">
            <Button variant="text" color="primary">
              SMS
            </Button>
          </Link>
        </Box>

        <Box
          sx={{
            borderBottom: activePath.includes("/sent-message/revote-list")
              ? `3px solid ${theme.palette.primary.main}`
              : "none",
          }}
        >
          <Link to="sms-message">
            <Button variant="text" color="primary">
              Email
            </Button>
          </Link>
        </Box>
      </Stack>

      <Outlet />
    </Paper>
  );
};

export default ListLayout;

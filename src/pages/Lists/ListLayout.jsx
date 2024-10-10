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
    if (currentPath === "/spin-result") {
      navigate("/spin-result/winners-list");
    }
  }, [navigate]);

  const activePath = location.pathname;

  useEffect(() => {
    if (activePath === "/spin-result") {
      navigate("/spin-result/winners-list");
    }
  }, [navigate, activePath]);

  useEffect(() => {
    let newUrl = "/api/prize/export"; // Default URL

    if (activePath === "/spin-result/winners-list") {
      newUrl = "/api/participant/winners";
    } else if (activePath.includes("/spin-result/rewards-list")) {
      newUrl = `/api/prize/${params.id}`;
    } else if (activePath === "/spin-result/revote-list") {
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
      <DatePickerCard url={url} />

      <Stack direction="row" gap={2} mb={2}>
        <Box
          sx={{
            borderBottom: activePath.includes("/spin-result/winners-list")
              ? `3px solid ${theme.palette.secondary.main}`
              : "none",
          }}
        >
          <Link to="winners-list">
            <Button variant="text" color="secondary">
              Winners List
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            borderBottom: activePath.includes("/spin-result/rewards-list")
              ? `3px solid ${theme.palette.secondary.main}`
              : "none",
          }}
        >
          <Link to="rewards-list">
            <Button variant="text" color="secondary">
              Prizes List
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            borderBottom: activePath.includes("/spin-result/revote-list")
              ? `3px solid ${theme.palette.secondary.main}`
              : "none",
          }}
        >
          <Link to="revote-list">
            <Button variant="text" color="secondary">
              Revoke List
            </Button>
          </Link>
        </Box>
      </Stack>

      <Outlet />
    </Paper>
  );
};

export default ListLayout;

import { Box, Button, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { theme } from "../../../theme";

const CampaignLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [url, setUrl] = useState("");

  const activePath = location.pathname;

  // Redirect to default nested route if necessary
  useEffect(() => {
    if (activePath === `/campaign/${params.id}`) {
      navigate(`/campaign/${params.id}/facebook-message`, { replace: true });
    }
  }, [navigate, activePath, params.id]);

  // Update export URL based on active path
  useEffect(() => {
    let newUrl = "/api/prize/export"; // Default URL

    if (activePath.includes("/facebook-message")) {
      newUrl = "/api/participant/winners";
    } else if (activePath.includes("/rewards-list")) {
      newUrl = `/api/prize/${params.id}`;
    } else if (activePath.includes("/revote-list")) {
      newUrl = `/api/participant/revote`;
    }

    setUrl(newUrl);
  }, [activePath, params.id]);

  return (
    <Paper
      sx={{
        // maxHeight: "90%",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        flex: 1,
      }}
    >
      <Box mb={1}>
        <Button
          sx={{
            border: "none",
            ":hover": {
              border: "none", // Prevent border on hover
              backgroundColor: theme.palette.action.hover, // Optional hover background color
            },
          }}
          variant="outlined"
          color="primary"
          onClick={() => navigate("/campaign")}
          startIcon={<ArrowBack />} // Add the arrow icon to the left of the text
        >
          Back
        </Button>
      </Box>
      <Stack direction="row" gap={2} mb={2}>
        {/* Navigation Tabs */}
        {[
          { label: "Facebook", path: "facebook-message" },
          { label: "Viber", path: "rewards-list" },
          { label: "Telegram", path: "revote-list" },
          { label: "SMS", path: "sms-message" },
          { label: "Email", path: "email-message" },
        ].map(({ label, path }) => (
          <Box
            key={path}
            sx={{
              borderBottom: activePath.includes(path)
                ? `3px solid ${theme.palette.primary.main}`
                : "none",
            }}
          >
            <Link to={path}>
              <Button variant="text" color="primary">
                {label}
              </Button>
            </Link>
          </Box>
        ))}
      </Stack>

      {/* Nested Routes */}
      <Outlet />
    </Paper>
  );
};

export default CampaignLayout;

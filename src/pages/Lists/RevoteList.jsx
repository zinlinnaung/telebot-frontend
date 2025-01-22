import { Box } from "@mui/material";

import CampaignDetailComponent from "../../components/campaign/CampaignDetailComponent";

const RevoteList = () => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <CampaignDetailComponent name={"telegram"} />
    </Box>
  );
};

export default RevoteList;

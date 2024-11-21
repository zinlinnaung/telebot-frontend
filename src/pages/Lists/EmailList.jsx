import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Container,
  Stack,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import EmailEditor from "../../components/message/EmailEditor";
import { DeviceFrameset } from "react-device-frameset";
import ChatBubble from "../../components/chat/ChatBubble";

const EmailList = () => {
  const { id } = useParams();
  const [emailContent, setEmailContent] = useState("");
  const [subject, setSubject] = useState("");
  const handleContentChange = (content) => {
    setEmailContent(content);
    console.log(emailContent);
  };
  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVICE_BASE_URL + `/campaigns/${id}`
        );
        const email = await JSON.parse(response.data.CampainDetail.email);
        setEmailContent(email?.emailContent);
        setSubject(email?.subject);
        // setCampaignData(response.data);
        // setComponents(JSON.parse(response.data.CampainDetail.email));
      } catch (error) {
        console.error("Error fetching campaign details:", error);
      }
    };
    fetchCampaignDetails();
  }, [id]);

  const handlePublish = async () => {
    // sms: JSON.stringify(components),
    try {
      const updatedData = {
        email: JSON.stringify({ emailContent, subject }),
      };

      // Make a PATCH request to update the campaign details
      await axios.patch(
        `${import.meta.env.VITE_SERVICE_BASE_URL}/campaigns/${id}/details`,
        updatedData
      );
      console.log("Email data sent successfully:", updatedData);
    } catch (error) {
      console.error("Error sending email data:", error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: "100%",
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                Campaign Name
              </Typography>
              <Typography variant="h5" textAlign="center" color={"primary"}>
                {`Campaign ${id}`}
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              mb: 2,
              padding: 0,
              width: "100%",
              minHeight: 50,
              maxHeight: 90,
            }}
          >
            <CardContent>
              <Typography variant="h6" textAlign="center">
                User Count
              </Typography>
              <Typography variant="h5" textAlign="center" color={"primary"}>
                {/* Display user count here */}
                1000
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
            minHeight: "55vh",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <EmailEditor
            emailContent={emailContent}
            handleContentChange={handleContentChange}
            subject={subject}
            setSubject={setSubject}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handlePublish}>
            Publish
          </Button>
        </Box>
      </Box>

      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <DeviceFrameset
          device="Galaxy Note 8"
          color="gold"
          zoom={0.9}
          width={"60%"}
          height={"61vh"}
        >
          <Box
            mt={2}
            sx={{
              height: "60vh",
              margin: 2,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: 2,
            }}
          >
            <Stack spacing={2} p={2}>
              <ChatBubble
                message={emailContent}
                isUser={false}
                type={"email"}
                subject={subject}
              />
            </Stack>
          </Box>
        </DeviceFrameset>
      </Container>
    </Box>
  );
};

export default EmailList;

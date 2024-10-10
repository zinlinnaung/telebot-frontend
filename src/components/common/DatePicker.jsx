import { Box, useMediaQuery } from "@mui/material";
import { Button, DatePicker, Form } from "antd";
import exportFromJSON from "export-from-json";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useLocation, useParams } from "react-router-dom";

const DatePickerCard = ({ url }) => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [fileName, setFileName] = useState("");
  const [fetchUrl, setFetchUrl] = useState("");
  const params = useParams();
  const { pathname } = useLocation();

  const api = useAxios();

  const widthmatches = useMediaQuery("(min-width:840px)");

  const startDate = new Date(
    new Date(dateRange?.startDate).setHours(0, 0, 0, 0)
  ).toISOString();

  const endDate = new Date(
    new Date(dateRange?.endDate).setHours(23, 59, 59, 0)
  ).toISOString();

  useEffect(() => {
    if (url === "/api/participant/export") {
      setFetchUrl(
        `/api/participant/export?start_date=${startDate}&end_date=${endDate}`
      );
      setFileName("Participants List");
    } else if (url === "/api/participant/winners") {
      setFetchUrl(`/api/participant/winners`);
      setFileName("Winners List");
    } else if (url === "/api/prize/export") {
      setFetchUrl(
        `/api/prize/export?start_date=${startDate}&end_date=${endDate}`
      );
      setFileName("Prizes List");
    } else if (url.includes("/api/prize/")) {
      setFetchUrl(`/api/prize/${params.id}`);
      setFileName("Winner List");
    } else if (url === "/api/participant/revote") {
      setFetchUrl(`/api/participant/revote`);
      setFileName("Revoke List");
    }
  }, [url, startDate, endDate]);

  const exportData = async () => {
    const { data } = await api.get(fetchUrl);
    // const prizeWinnerExport = data?.ParticepentPrize?.map((item) => {
    //   const prizeWinnerColumn = {
    //     ID: item?.id,
    //     "Prize Name": item?.name,
    //     Name: item?.participants.name,
    //     Phone: item?.participants.phone,
    //   };

    //   return prizeWinnerColumn;
    // });

    const dataToExport = pathname.includes("/spin-result/rewards-list/")
      ? data?.ParticepentPrize?.filter(
          (item) => startDate <= item?.created_at && endDate >= item?.created_at
        ).map((item) => {
          const prizeWinnerColumn = {
            ID: item?.id,
            "Prize Name": data?.name,
            Name: item?.participants?.name,
            "Citizens Pay ID": item?.participants?.citizenpay_id,
            Phone: item?.participants?.phone,
            Date: new Date(item?.created_at).toLocaleString(),
          };

          return prizeWinnerColumn;
        })
      : data
          ?.filter(
            (item) =>
              startDate <= item?.created_at && endDate >= item?.created_at
          )
          .map((item) => {
            const prizeExcelColumn = {
              ID: item?.id,
              Name: item?.name,
            };

            const excelColumn = {
              ID: item?.id,
              Name: item?.name,
              "Phone Number": item?.phone,
            };

            const revokeColumn =
              fetchUrl === "/api/participant/revote"
                ? {
                    ID: item?.participants.id,
                    Name: item?.participants.name,
                    "Phone Number": item?.participants.phone,
                  }
                : null;
            if (url === "/api/prize/export") {
              return prizeExcelColumn;
            }
            if (fetchUrl === "/api/participant/revote") {
              return revokeColumn;
            } else {
              return excelColumn;
            }
          });

    const exportType = "xls";

    exportFromJSON({
      data: dataToExport,
      fileName,
      exportType,
      delimiter: ",",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        // margin: "1rem 1",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: { xs: "center", md: "start" },
        alignItems: "center",
        width: "100%",
      }}
    >
      <Form
        name="myForm"
        onFinish={exportData}
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: widthmatches ? "flex" : "block",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: widthmatches ? "40%" : "100%",
          }}
        >
          <Form.Item
            style={{
              flex: 1,
            }}
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please select a date!",
              },
            ]}
          >
            <DatePicker
              format="MM/DD/YYYY"
              // disabledDate={disableNormalStart}
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.3) ",
                padding: "5px",
                borderRadius: "5px",
                width: widthmatches ? "100%" : "80%",
                flex: 1,
                marginTop: "0.5rem",
              }}
              onChange={(date) =>
                setDateRange({ ...dateRange, startDate: date })
              }
              placeholder="Start Date *"
              size="large"
            />
          </Form.Item>
          <Form.Item
            style={{
              flex: 1,
            }}
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please select a date!",
              },
            ]}
          >
            <DatePicker
              format="MM/DD/YYYY"
              // disabledDate={disableNormal}
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(0,0,0,0.3) ",
                padding: "5px",
                borderRadius: "5px",
                width: widthmatches ? "100%" : "80%",
                flex: 1,
                marginTop: "0.5rem",
              }}
              onChange={(date) => setDateRange({ ...dateRange, endDate: date })}
              placeholder="End Date *"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                backgroundColor: "#0D519D",
                color: "white",
                width: "6rem",
                height: "2.5rem",
                paddingTop: "0.2rem",
                marginTop: "0.5rem",
              }}
              size="small"
              variant="contained"
              htmlType="submit"
              // href={`${
              //   import.meta.env.REACT_APP_SERVICE_BASE_URL
              // }/api/customer/export?start_date=${startDate}&end_date=${endDate}`}
            >
              Export
            </Button>
          </Form.Item>
        </Box>
      </Form>
    </Box>
  );
};

export default DatePickerCard;

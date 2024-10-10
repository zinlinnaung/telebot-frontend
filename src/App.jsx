import { CustomSnackbar } from "./hocs/CustomeSnackbar";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./router/Router";
import { ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <CustomSnackbar>
            <Router />
          </CustomSnackbar>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;

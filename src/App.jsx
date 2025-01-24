// import DocumentGenerator from "./components/DocumentGenerator";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import AppLayout from "./ui/AppLayout";
import { BrowserRouter, Route, Routes } from "react-router";
import ResidenceCertificate from "./components/DocumentGenerator/ResidenceCertificate";
import Form_I from "./components/DocumentGenerator/Form_I";
import Form_XVI from "./components/DocumentGenerator/Form_XVI";

// Global Style for modern typography and baseline reset
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    background-color: #f4f6f9;
    color: #2c3e50;
    line-height: 1.6;
  }
`;

// Modern Theme
const theme = {
  colors: {
    primary: "#3498db",
    background: "#f4f6f9",
    text: "#2c3e50",
    sidebar: "#ffffff",
    header: "#ffffff",
  },
  typography: {
    fontSize: {
      small: "0.875rem",
      normal: "1rem",
      large: "1.25rem",
    },
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <DocumentGenerator /> */}
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="residence" element={<ResidenceCertificate />} />
            <Route path="formI" element={<Form_I />} />
            <Route path="formXVI" element={<Form_XVI />} />
          </Route>
        </Routes>
        {/* <AppLayout /> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

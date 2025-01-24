import styled from "styled-components";
import AppHeader from "../components/Header";
import AppSidebar from "../components/Sidebar";
// import DocumentGenerator from "../components/DocumentGenerator";
import { Outlet } from "react-router";

const DashboardLayout = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
`;

const MainContent = styled.main`
  grid-area: main;
  background-color: ${(props) => props.theme.colors.background};
  padding: 20px;
  overflow-y: auto;
`;

const AppLayout = () => {
  return (
    <DashboardLayout>
      <AppHeader />
      <AppSidebar />
      <MainContent>
        <Outlet />
        {/* <DocumentGenerator /> */}
      </MainContent>
    </DashboardLayout>
  );
};

export default AppLayout;

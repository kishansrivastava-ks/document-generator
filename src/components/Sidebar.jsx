import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: ${(props) => props.theme.colors.sidebar};
  padding: 20px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;

  nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  a {
    text-decoration: none;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text};
    padding: 10px 15px;
    border-radius: 8px;
    transition: all 0.3s ease;

    &.active {
      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;

const AppSidebar = () => {
  return (
    <Sidebar>
      <nav>
        <NavLink to="/residence" activeClassName="active">
          Residence Certificate
        </NavLink>
        <NavLink to="/formI" activeClassName="active">
          Form I
        </NavLink>
        <NavLink to="/formXVI" activeClassName="active">
          Form XVI
        </NavLink>
        <NavLink to="#" activeClassName="active">
          Generated Documents
        </NavLink>
      </nav>
    </Sidebar>
  );
};

export default AppSidebar;

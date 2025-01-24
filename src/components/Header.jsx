import styled from "styled-components";

const Header = styled.header`
  grid-area: header;
  background: linear-gradient(135deg, #4a90e2, #9013fe);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
  }

  button {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
`;

const AppHeader = () => {
  return (
    <Header>
      <h1>Document Generator</h1>
      <button>Logout</button>
    </Header>
  );
};

export default AppHeader;

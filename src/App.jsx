import React from "react";
import Practice from "./components/Practice"; 
import CrudApp from "./components/CrudApp";   
import { Container } from "@mui/material";

function App() {
  return (
    <Container>
      <Practice />
      <CrudApp /> 
    </Container>
  );
}

export default App;

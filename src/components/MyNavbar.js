import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function MyNavbar(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Handle logout
    //props.setAuthenticated(false);
    //navigate("/login");
    Axios.post("http://localhost:4000/logout");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Robust</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href={"/home"}>Home</Nav.Link>
          <Nav.Link href={"/goals"}>Goals</Nav.Link>
          <Nav.Link href={"/food"}>Food</Nav.Link>
          <Nav.Link href={"/exercise"}>Exercise</Nav.Link>
          <Nav.Link href={"/sleep"}>Sleep</Nav.Link>
          <Nav.Link href={"/weight"}>Weight</Nav.Link>
        </Nav>
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;

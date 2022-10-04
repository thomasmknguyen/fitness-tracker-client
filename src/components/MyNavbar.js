import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand>Robust</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href={"/home"}>Home</Nav.Link>
          <Nav.Link href={process.env.PUBLIC_URL + "/goals"}>Goals</Nav.Link>
          <Nav.Link href={process.env.PUBLIC_URL + "/food"}>Food</Nav.Link>
          <Nav.Link href={process.env.PUBLIC_URL + "/exercise"}>
            Exercise
          </Nav.Link>
          <Nav.Link href={process.env.PUBLIC_URL + "/sleep"}>Sleep</Nav.Link>
          <Nav.Link href={process.env.PUBLIC_URL + "/weight"}>Weight</Nav.Link>
        </Nav>
        <Button variant="secondary">Logout</Button>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;

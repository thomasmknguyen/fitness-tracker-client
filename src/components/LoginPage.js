import React, { useState, useRef } from "react";
import Axios from "axios";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:4000/login", {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    }).then((response) => {
      console.log(response.data);
    });
    /* console.log(
      `email is ${emailRef.current.value}, password is ${passwordRef.current.value}`
    ); */
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Log in</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Button className="w-100" variant="dark" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-3">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </Container>
  );
}

export default LoginPage;

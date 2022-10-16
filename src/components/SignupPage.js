import React, { useState } from "react";
import Axios from "axios";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    Axios.post("http://localhost:4000/register", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log(`email is ${email}, password is ${password}, passwordConfirm is ${passwordConfirm}`);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Sign up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
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
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </Container>
  );
}

export default SignupPage;

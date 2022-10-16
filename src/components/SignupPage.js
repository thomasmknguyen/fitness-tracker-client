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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    await Axios.post("http://localhost:4000/register", {
      email: email,
      password: password,
    })
      .then((response) => {
        if (
          response.data === "Unable to connect to database" ||
          response.data === "Email already has an account" ||
          response.data === "Error"
        ) {
          setError(response.data);
        } else {
          // TODO: Handle sign up
          console.log(response.data); // Values inserted
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setError("Unable to connect to server");
        } else {
          setError("Error");
          console.log(error);
        }
      });
    setLoading(false);
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
              {error && <Alert variant="danger">{error}</Alert>}
              <Button
                className="w-100"
                variant="dark"
                disabled={loading}
                type="submit"
              >
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

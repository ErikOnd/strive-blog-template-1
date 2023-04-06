import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const Login = () => {
  const apiUrl = process.env.REACT_APP_BE_URL;
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async () => {
    try {
      const response = await fetch(`${apiUrl}/authors/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const accessToken = await response.json();
        localStorage.setItem("accessToken", accessToken.accessToken);
        setRedirect(true);
      } else {
        console.error("Login information wrong");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center login-container"
      style={{ height: "100vh" }}
    >
      <div style={{ maxWidth: 400 }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            Submit
          </Button>
          <a href="http://localhost:3004/authors/googleLogin">
            <GoogleButton className="mt-3" />
          </a>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="link-primary">
              Register here
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;

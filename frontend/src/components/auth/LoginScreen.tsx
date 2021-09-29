import { useState } from "react";
import Box from "@mui/material/Box";

import Login from "./Login";
import Register from "./Register";
import { Button, Container, Typography } from "@mui/material";
const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState(false);

  return (
      <Container
          sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "2em 1em",
          }}>
          <Typography variant='h3' component='h1' gutterBottom>
              Welcome To Bookflix
          </Typography>
          <Container
              maxWidth='sm'
              sx={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "2em",
                  marginBottom: 4,
              }}>
              <Button onClick={() => setLoginForm((current) => !current)}>
                  {loginForm ? "Create an account" : "Already A user? Login"}
              </Button>
              {loginForm ? <Login /> : <Register />}
          </Container>
          <Typography variant='caption' component='strong'>
              Made with ❤️ by Renzo
          </Typography>
      </Container>
  );
};

export default LoginScreen;

import { useState } from "react";
import Box from "@mui/material/Box";

import Login from "./Login";
import Register from "./Register";
import { Button, Container, Typography } from "@mui/material";
const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState(false);

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome To Bookflix
      </Typography>
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "yellow",
          padding: "2em",
        }}
      >
        <Button onClick={() => setLoginForm((current) => !current)}>
          {loginForm ? "Create an account" : "Already A user? Login"}
        </Button>
        {loginForm ? <Login /> : <Register />}
      </Container>
    </Box>
  );
};

export default LoginScreen;

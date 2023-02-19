import React, { useState } from "react";
import {
  Avatar,
  TextField,
  Typography,
  Box,
  Container,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLogin } from "../hooks/useLogin";

export const SignInPage = () => {
  const { loading, error, signIn } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitSingInForm = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 15,
          width: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1">
          Signin
        </Typography>
        <Box
          component="form"
          noValidate={false}
          onSubmit={submitSingInForm}
          sx={{ mt: 2 }}
        >
          <TextField
            id="email"
            margin="normal"
            required
            variant="outlined"
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoFocus
          />
          <TextField
            id="password"
            margin="normal"
            required
            variant="outlined"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="current-password"
          />
          <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          {error && <Alert severity="error">Unauthorized Access</Alert>}
        </Box>
      </Box>
    </Container>
  );
};

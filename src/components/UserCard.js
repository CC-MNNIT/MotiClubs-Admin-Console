import {
  Avatar,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { usePost } from "../hooks/usePost";

const UserCard = ({
  name,
  avatar,
  email,
  userId,
  clubId,
  fetchAdmins,
  setSnackbarOpen,
  setSnackbarSuccess,
  setMessage,
}) => {
  const { posting, postError, post } = usePost();

  const removeAdmin = async () => {
    const response = await post("admin/remove_admin", {
      clubId,
      userId,
    });
    if (response) {
      setSnackbarOpen(true);
      setSnackbarSuccess(true);
      setMessage("Admin removed");
      await fetchAdmins();
    } else {
      setSnackbarOpen(true);
      setSnackbarSuccess(false);
      setMessage("Something went wrong!");
    }
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar src={avatar} variant="rounded" sx={{ height: 60, width: 60 }} />
      <Stack direction="column">
        <Typography variant="h6" gutterBottom={false}>
          {name}
        </Typography>
        <Typography variant="body2" gutterBottom={false} color="text.secondary">
          {email}
        </Typography>
        {posting ? (
          <CircularProgress size={30} color="success" sx={{ mt: 1 }} />
        ) : (
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ mt: 1, width: "fit-content" }}
            onClick={removeAdmin}
          >
            Remove as admin
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default UserCard;

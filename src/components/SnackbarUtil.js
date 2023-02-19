import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarUtil = ({ open, setOpen, success, message }) => {
  console.log(message);
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
          severity={success ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarUtil;

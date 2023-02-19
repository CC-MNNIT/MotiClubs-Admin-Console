import React, { useEffect, useState } from "react";
import { useClubContext } from "../hooks/useClubContext";
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { Stack } from "@mui/system";
import UserCard from "./UserCard";
import { useDelete } from "../hooks/useDelete";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { usePost } from "../hooks/usePost";
import SnackbarUtil from "./SnackbarUtil.js";

const ClubSettings = ({ loading, error, fetchAdmins, fetchClubs, admins }) => {
  const { dispatch } = useClubContext();
  const { club } = useClubContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [adminModal, setAdminModal] = useState(false);
  const { deleting, deleteError, _delete } = useDelete();
  const [adminEmail, setAdminEmail] = useState("");
  const { posting, postError, post } = usePost();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const deleteClub = async () => {
    setModalOpen(false);
    dispatch({ type: "DESELECT" });
    const response = await _delete("admin/delete_club?clubId=" + club.clubId);
    if (response) {
      setSnackbarOpen(true);
      setSnackbarSuccess(true);
      setMessage("Club deleted");
      await fetchClubs();
    } else {
      setSnackbarOpen(true);
      setSnackbarSuccess(false);
      setMessage("Something went wrong!");
    }
  };

  const addAdmin = async () => {
    if (adminEmail === "") return;
    setAdminModal(false);
    console.log({
      clubId: club.clubId,
      email: adminEmail,
    });
    const response = await post("admin/add_admin", {
      clubId: club.clubId,
      email: adminEmail,
    });
    setAdminEmail("");
    if (response) {
      setSnackbarOpen(true);
      setSnackbarSuccess(true);
      setMessage("Admin added");
      await fetchAdmins();
    } else {
      setSnackbarOpen(true);
      setSnackbarSuccess(false);
      setMessage("Failed. Try entering valid email.");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [club]);

  return (
    <>
      {club || deleting ? (
        loading || deleting | posting ? (
          <CircularProgress
            sx={{ mt: 3, width: "100%", alignSelf: "center" }}
          />
        ) : (
          <Stack direction="column" sx={{ mt: 3 }} spacing={3}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={10}
            >
              <Stack direction="column">
                <Typography variant="h5">{club.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {club.summary}
                </Typography>
              </Stack>
              <Button
                variant="text"
                startIcon={<DeleteOutlineRoundedIcon />}
                color="error"
                sx={{ mx: "auto" }}
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                Delete
              </Button>
              <Dialog open={modalOpen}>
                <DialogTitle>Delete Club</DialogTitle>
                <DialogContent>
                  <DialogContentText>Are you sure?</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setModalOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={deleteClub}>Delete</Button>
                </DialogActions>
              </Dialog>
            </Stack>
            <Grid container spacing={3}>
              {admins.map((admin) => {
                return (
                  <Grid
                    key={admin.uid}
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={4}
                  >
                    <UserCard
                      avatar={admin.avatar}
                      name={admin.name}
                      email={admin.email}
                      userId={admin.uid}
                      clubId={club.clubId}
                      fetchAdmins={fetchAdmins}
                      setSnackbarOpen={setSnackbarOpen}
                      setSnackbarSuccess={setSnackbarSuccess}
                      setMessage={setMessage}
                    />
                  </Grid>
                );
              })}
              <Grid key="button" item>
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<AddCircleOutlinedIcon />}
                  sx={{ mt: 3 }}
                  onClick={() => {
                    setAdminModal(!adminModal);
                  }}
                >
                  Add admin
                </Button>
              </Grid>
            </Grid>
            <Dialog open={adminModal}>
              <DialogTitle>Make new admin</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the email of new admin
                </DialogContentText>
                <TextField
                  autoFocus
                  variant="outlined"
                  sx={{ mt: 3 }}
                  value={adminEmail}
                  type="email"
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setAdminModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={addAdmin}>Save</Button>
              </DialogActions>
            </Dialog>
          </Stack>
        )
      ) : (
        <Typography variant="h6" sx={{ mt: 3 }}>
          No Club Selected
        </Typography>
      )}
      <SnackbarUtil
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message={message}
        success={snackbarSuccess}
      />
    </>
  );
};

export default ClubSettings;

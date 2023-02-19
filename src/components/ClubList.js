import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useClubContext } from "../hooks/useClubContext";
import ClubCard from "./ClubCard";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { usePost } from "../hooks/usePost";
import SnackbarUtil from "./SnackbarUtil";

const ClubList = ({ loading, fetchClubs, clubs, error }) => {
  const { dispatch } = useClubContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [newClubName, setNewClubName] = useState("");
  const { posting, postError, post } = usePost();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const addClub = async () => {
    if (newClubName === "") return;
    setModalOpen(false);
    dispatch({ type: "DESELECT" });
    const response = await post("admin/add_club", {
      name: newClubName,
      description: "",
      summary: "",
      avatar: "",
    });
    setNewClubName("");
    if (response) {
      setSnackbarOpen(true);
      setSnackbarSuccess(true);
      setMessage("New club created");
      await fetchClubs();
    } else {
      setSnackbarOpen(true);
      setSnackbarSuccess(false);
      setMessage("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="space-between"
        direction="row"
        sx={{ mb: 3 }}
      >
        <Typography variant="h5">Clubs</Typography>
        <Button
          type="text"
          startIcon={<AddCircleOutlineRoundedIcon />}
          color="primary"
          onClick={() => setModalOpen(!modalOpen)}
        >
          Add Club
        </Button>
        <Dialog open={modalOpen}>
          <DialogTitle>New Club</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the name of the new club.
            </DialogContentText>
            <TextField
              autoFocus
              variant="outlined"
              sx={{ mt: 3 }}
              value={newClubName}
              onChange={(e) => setNewClubName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={addClub}>Save</Button>
          </DialogActions>
        </Dialog>
      </Stack>
      {loading || posting ? (
        <CircularProgress sx={{ alignSelf: "center" }} />
      ) : (
        <Stack
          direction="row"
          spacing={4}
          sx={{
            mb: 3,
            pb: 2,
            overflowX: "scroll",
            overflowY: "hidden",
            px: 3,
          }}
        >
          {clubs.map((club) => (
            <ClubCard
              key={club.cid}
              id={club.cid}
              name={club.name}
              summary={club.summary}
              description={club.description}
              admins={club.admins}
              avatar={
                club.avatar
                  ? club.avatar
                  : "https://wp-media.petersons.com/blog/wp-content/uploads/2019/11/04133514/Student-Club-2.jpg"
              }
            />
          ))}
        </Stack>
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

export default ClubList;

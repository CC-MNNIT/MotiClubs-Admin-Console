import React, { useState } from "react";
import ClubList from "../components/ClubList";
import NavBar from "../components/NavBar";
import { Box, CssBaseline } from "@mui/material";
import ClubSettings from "../components/ClubSettings";
import { useFetch } from "../hooks/useFetch";
import { useClubContext } from "../hooks/useClubContext";

export const ConsolePage = () => {
  const { dispatch, club } = useClubContext();
  const clubsFetch = useFetch();
  const adminsFetch = useFetch();
  const [clubs, setClubs] = useState([]);
  const [admins, setAdmins] = useState([]);

  const fetchClubs = async () => {
    const response = await clubsFetch.fetch("clubs");
    setClubs(response);
    if (response.length > 0) {
      dispatch({
        type: "SELECT",
        payload: {
          clubId: response[0].cid,
          name: response[0].name,
          summary: response[0].summary,
        },
      });
    }
  };

  const fetchAdmins = async () => {
    if (club) {
      const clubId = club.clubId;
      const response = await adminsFetch.fetch("user/admins");
      const arr = [];
      for (let i = 0; i < response.length; ++i) {
        if (response[i].cid === clubId) arr.push(response[i]);
      }
      setAdmins(arr);
    }
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <main>
        <Box
          sx={{
            my: 3,
            mx: { s: 2, xs: 2, m: 4, l: 8, xl: 8 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ClubList
            loading={clubsFetch.loading}
            error={clubsFetch.error}
            clubs={clubs}
            fetchClubs={fetchClubs}
          />
          <ClubSettings
            loading={adminsFetch.loading}
            error={adminsFetch.error}
            fetchAdmins={fetchAdmins}
            fetchClubs={fetchClubs}
            admins={admins}
          />
        </Box>
      </main>
    </>
  );
};

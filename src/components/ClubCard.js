import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useClubContext } from "../hooks/useClubContext";

const ClubCard = ({ avatar, name, summary, description, id, admins }) => {
  const { dispatch } = useClubContext();

  const selectClub = (e) => {
    dispatch({
      type: "SELECT",
      payload: {
        clubId: id,
        name: name,
        summary: summary,
      },
    });
  };

  return (
    <Card sx={{ width: 220, flexShrink: 0 }} elevation={4}>
      <CardActionArea onClick={selectClub}>
        <CardMedia image={avatar} sx={{ height: 90 }} />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClubCard;

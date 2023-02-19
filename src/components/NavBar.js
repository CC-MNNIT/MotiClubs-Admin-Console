import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useFetch } from "../hooks/useFetch";
import { Container } from "@mui/system";
import { useAuthContext } from "../hooks/useAuthContext";

const NavBar = () => {
  const { fetch } = useFetch();
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const { dispatch } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({
      type: "SIGNOUT",
    });
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("user");
      setProfileImage(response.avatar);
      setEmail(response.email);
    })();
  }, []);

  return (
    <>
      <AppBar elevation={0} position="sticky">
        <Toolbar>
          <NotificationsNoneRoundedIcon fontSize="large" />
          <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>
            MotiClubs
          </Typography>
          <Avatar
            src={profileImage}
            id="profile-button"
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "profile-button",
            }}
          >
            <MenuList sx={{ px: 3 }}>
              <Container>
                <Avatar src={profileImage} sx={{ mx: "auto" }} />
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  {email}
                </Typography>
              </Container>
              <Divider sx={{ my: 2 }} />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;

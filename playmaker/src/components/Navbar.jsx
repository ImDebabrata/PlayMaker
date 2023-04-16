import React from "react";
import styled from "styled-components";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../redux/authSlice";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <StyledNavbar>
        <StyledToolbar>
          <StyledIconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </StyledIconButton>
          <StyledTypography
            variant="h6"
            component="div"
            onClick={() => console.log("Clicked on Playmaker")}
          >
            Playmaker
          </StyledTypography>
          <RowLinks>
            {!token ? (
              <>
                {" "}
                <Link to={"/"}>
                  <StyledButton color="inherit">Login</StyledButton>
                </Link>
                <Link to={"/register"}>
                  <StyledButton color="inherit">Signup</StyledButton>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link to={"/events"}>
                  <StyledButton color="inherit">Events</StyledButton>
                </Link>
                <Link to={"/addevent"}>
                  <StyledButton color="inherit">Add Events</StyledButton>
                </Link>
                <Link to={"/logs"}>
                  <StyledButton color="inherit">Applied Logs</StyledButton>
                </Link>
                <StyledButton onClick={handleLogOut} color="inherit">
                  Logout
                </StyledButton>
              </>
            )}
          </RowLinks>
        </StyledToolbar>
      </StyledNavbar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <DrawerList>
          {!token ? (
            <>
              <ListItem button>
                <Link to={"/"}>
                  <ListItemText primary="Login" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={"/register"}>
                  <ListItemText primary="Signup" />
                </Link>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button>
                <Link to={"/events"}>
                  <ListItemText primary="Events" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={"/addevent"}>
                  <ListItemText primary="Add Event" />
                </Link>
              </ListItem>
              <ListItem button>
                <Link to={"/logs"}>
                  <ListItemText primary="Applied Logs" />
                </Link>
              </ListItem>
              <Divider />
              <ListItem onClick={handleLogOut} button>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </DrawerList>
      </Drawer>
    </>
  );
};

const StyledNavbar = styled(AppBar)`
  && {
    background-color: #1e90ff;
    color: white;
    position: static;
    box-shadow: none;
  }
`;

const StyledTypography = styled(Typography)`
  && {
    font-size: 1.5rem;
    font-weight: 700;
    cursor: pointer;
    @media (max-width: 600px) {
      font-size: 1.2rem;
    }
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    @media (min-width: 601px) {
      display: none;
    }
  }
`;

const StyledButton = styled(Button)`
  && {
    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const DrawerList = styled(List)`
  && {
    width: 200px;
    padding: 0;
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    justify-content: space-between;
  }
`;

const RowLinks = styled.div`
  > a {
    color: white !important;
  }
`;

export default Navbar;

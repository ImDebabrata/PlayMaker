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

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
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
          <div>
            <StyledButton color="inherit">Login</StyledButton>
            <StyledButton color="inherit">Signup</StyledButton>
            <StyledButton color="inherit">Events</StyledButton>
            <StyledButton color="inherit">Accept/Request</StyledButton>
            <StyledButton color="inherit">Logout</StyledButton>
          </div>
        </StyledToolbar>
      </StyledNavbar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <DrawerList>
          <ListItem button>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Signup" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Accept/Request" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Logout" />
          </ListItem>
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

export default Navbar;

import React from "react";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  List,
  ListItem,
  ListItemText,
  Drawer
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

import logo from "../../Images/logo_primary_bar.png";

const useStyles = makeStyles(theme => ({
  bar: {
    background: "#ffffff",
    boxShadow: "none",
    borderBottom: "1px ridge"
  },
  title: {
    fontWeight: "bold",
    fontSize: "20px"
  },
  list: {
    width: 200
  },
  listItem: {},
  listIcon: {
    marginRight: "20px"
  }
}));

function MainAppBar({ props }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isClick: false
  });
  const [cookies, setCookie, removeCookie] = useCookies([
    "_id",
    "token",
    "autoLogin"
  ]);
  const [isLogout, setIsLogout] = React.useState(false);
  const sideList = () => (
    <div className={classes.list} role="presentation">
      <List>
        <ListItem button style={{ color: "#555" }}>
          <AccountCircleIcon className={classes.listIcon} color="primary" />
          <ListItemText className={classes.listItem} primary="회원정보" />
        </ListItem>
        <Link to="/message" style={{ textDecoration: "none" }}>
          <ListItem button style={{ color: "#555" }}>
            <MailIcon className={classes.listIcon} color="primary" />
            <ListItemText className={classes.listItem} primary="쪽지함" />
          </ListItem>
        </Link>
        <ListItem button style={{ color: "#555" }}>
          <PowerSettingsNewIcon className={classes.listIcon} color="primary" />
          <ListItemText
            className={classes.listItem}
            primary="로그아웃"
            onClick={logoutClick}
          />
        </ListItem>
      </List>
    </div>
  );
  const logoutClick = () => {
    removeCookie("_id", { path: "/" });
    removeCookie("token", { path: "/" });
    removeCookie("autoLogin", { path: "/" });
    setIsLogout(true);
  };
  const menuClick = () => {
    setState({ isClick: !state.isClick });
  };
  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ isClick: open });
  };
  if (isLogout) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <AppBar className={classes.bar} position="sticky">
          <Toolbar>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <IconButton edge="end" disabled>
                <MenuIcon style={{ color: "#fff" }} />
              </IconButton>
              <Link to="/main">
                <img src={logo} alt="" style={{ width: "55px" }} />
              </Link>
              <IconButton edge="end" onClick={menuClick}>
                <MenuIcon color="primary" />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={state.isClick}
          onClose={toggleDrawer(false)}
        >
          {sideList()}
        </Drawer>
      </div>
    );
  }
}

export default MainAppBar;
MainAppBar.propTypes = {
  post: PropTypes.object
};

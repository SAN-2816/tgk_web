import React from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
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
  }
}));

function MainAppBar() {
  const classes = useStyles();
  return (
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
          <img src={logo} alt="" style={{ width: "55px" }} />
          <IconButton edge="end">
            <MenuIcon color="primary" />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
MainAppBar.propTypes = {
  post: PropTypes.object
};

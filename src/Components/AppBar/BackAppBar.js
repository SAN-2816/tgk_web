import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(theme => ({
  bar: {
    background: "#ffffff",
    boxShadow: "none",
    borderBottom: "1px ridge"
  },
  title: {
    color: "#36A0FF",
    fontWeight: "bold",
    fontSize: "20px"
  }
}));

function BackAppBar({ name }) {
  const classes = useStyles();
  return (
    <AppBar
      className={classes.bar}
      position="sticky"
      style={{
        boxShadow: "none"
      }}
    >
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Link to="/main">
            <IconButton edge="end">
              <ArrowBackIosIcon color="primary" />
            </IconButton>
          </Link>
          <Typography className={classes.title}>{name}</Typography>
          <IconButton edge="end" disabled>
            <ArrowBackIosIcon style={{ color: "#ffffff" }} />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default BackAppBar;
BackAppBar.propTypes = {
  post: PropTypes.object
};

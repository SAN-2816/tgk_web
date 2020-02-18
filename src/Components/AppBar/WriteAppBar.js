import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

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
  },
  text: { fontSize: "15px", color: "#36A0FF" }
}));

function WriteAppBar({ callbackRegist, isLoading }) {
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
          <Link to="/main" style={{ textDecoration: "none" }}>
            <Button className={classes.text}>취소</Button>
          </Link>
          <Typography className={classes.title}>글쓰기</Typography>
          <Button
            className={classes.text}
            onClick={() => callbackRegist()}
            disabled={isLoading}
          >
            등록
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default WriteAppBar;
WriteAppBar.propTypes = {
  post: PropTypes.object
};

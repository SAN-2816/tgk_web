import React from "react";
import {
  Typography,
  Grid,
  Button,
  FormControl,
  Input
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: "15px",
    marginLeft: "10px",
    marginBottom: "15px",
    fontSize: "23px",
    fontWeight: "bold"
  },
  button: {
    width: "90px",
    marginTop: "20px",
    fontSize: "25px",
    borderRadius: "20px",
    background: "#bdbdbd",
    color: "white",
    boxShadow: "none"
  }
}));

export function PersonTag({ callbackFromParent }) {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.title} color="primary">
        인원을 선택해주세요.
      </Typography>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={() => callbackFromParent(1)}
          >
            1:1
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={() => callbackFromParent(2)}
          >
            2:2
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={() => callbackFromParent(3)}
          >
            3:3
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={() => callbackFromParent(4)}
          >
            4:4
          </Button>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            onClick={() => callbackFromParent(5)}
          >
            모임
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
export function RegionTag({ callbackFromParent }) {
  const classes = useStyles();

  return (
    <div style={{ maxHeight: "50px" }}>
      <Typography className={classes.title} color="primary">
        지역을 선택해주세요.
      </Typography>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("서울")}
            >
              서울
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("경기")}
            >
              경기
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("인천")}
            >
              인천
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("강원")}
            >
              강원
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("대전")}
            >
              대전
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("충남")}
            >
              충남
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("대구")}
            >
              대구
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("충북")}
            >
              충북
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("광주")}
            >
              광주
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("전북")}
            >
              전북
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("울산")}
            >
              울산
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("전남")}
            >
              전남
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("부산")}
            >
              부산
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("경북")}
            >
              경북
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("제주")}
            >
              제주
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              size="large"
              onClick={() => callbackFromParent("경남")}
            >
              경남
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export function AgeTag({ callbackFromParent }) {
  const classes = useStyles();
  let age = 0;
  const inputChange = e => {
    age = e.target.value;
  };
  return (
    <div style={{ maxHeight: "50px" }}>
      <Typography className={classes.title} color="primary">
        나이를 입력해주세요.
      </Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ marginTop: "100px" }}
      >
        <FormControl>
          <Input
            type="number"
            onChange={inputChange}
            style={{ marginRight: "10px" }}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          position="end"
          onClick={() => callbackFromParent(age)}
          style={{ boxShadow: "none" }}
        >
          확인
        </Button>
      </Grid>
    </div>
  );
}

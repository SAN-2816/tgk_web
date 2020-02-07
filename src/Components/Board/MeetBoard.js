import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Card,
  CardContent,
  Typography,
  Grid,
  Container
} from "@material-ui/core/";
import moment from "moment-timezone";

const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: "170px",
    marginBottom: "10px"
  },
  chip: {
    marginRight: "10px",
    marginBottom: "5px"
  },
  title: { marginBottom: "5px" },
  content: { marginBottom: "5px" },
  bottom: {
    color: "#9e9e9e",
    fontSize: "12px",
    marginRight: "16px"
  },
  date: {
    color: "#9e9e9e",
    fontSize: "10px",
    marginRight: "16px"
  }
}));

function MeetBoard({ board }) {
  const classes = useStyles();
  let personString = "1:1";
  switch (board.personTag) {
    case 1:
      personString = "1:1";
      break;
    case 2:
      personString = "2:2";
      break;
    case 3:
      personString = "3:3";
      break;
    case 4:
      personString = "4:4";
      break;
    case 5:
      personString = "다수";
      break;
    default:
      break;
  }

  let sexColor = "primary";
  if (board.uid.sex === 1) {
    sexColor = "secondary";
  }
  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <Chip
            className={classes.chip}
            size="small"
            label={personString}
            color={sexColor}
          />
          <Chip
            className={classes.chip}
            size="small"
            label={board.ageTag}
            color={sexColor}
          />
          <Chip
            className={classes.chip}
            size="small"
            label={board.regionTag}
            color={sexColor}
          />
        </div>

        <Typography className={classes.title} variant="h6">
          {board.title}
        </Typography>
        <pre>
          <Typography className={classes.content} variant="caption">
            {board.content}
          </Typography>
        </pre>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Typography className={classes.bottom}>
            {board.uid.company}
          </Typography>
          <Typography className={classes.bottom}>
            {board.uid.nickname}
          </Typography>
        </Grid>
        <Typography className={classes.date}>
          {moment.tz(board.timeTag, "Asia/Seoul").format("YY.MM.DD HH:mm")}
        </Typography>
      </Container>
    </div>
  );
}
export default MeetBoard;

MeetBoard.propTypes = {
  post: PropTypes.object
};

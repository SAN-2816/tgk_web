import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Card, CardContent, Typography, Grid } from "@material-ui/core/";
import moment from "moment-timezone";

const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: "170px",
    marginBottom: "10px",
    boxShadow: "none"
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

function MeetBoardList({
  _id,
  uid,
  title,
  content,
  personTag,
  regionTag,
  ageTag,
  timeTag
}) {
  const classes = useStyles();
  let personString = "1:1";
  switch (personTag) {
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
  if (uid.sex === 1) {
    sexColor = "secondary";
  }
  function clickLink() {
    localStorage.setItem("board_id", _id);
  }
  return (
    <div>
      <Link
        to={{
          pathname: "/board",
          state: { _id: _id }
        }}
        style={{ textDecoration: "none" }}
        onClick={clickLink}
      >
        <Card className={classes.card}>
          <CardContent
            className={classes.cardContent}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            <Chip
              className={classes.chip}
              size="small"
              label={personString}
              color={sexColor}
            />
            <Chip
              className={classes.chip}
              size="small"
              label={ageTag}
              color={sexColor}
            />
            <Chip
              className={classes.chip}
              size="small"
              label={regionTag}
              color={sexColor}
            />

            <Typography className={classes.title} variant="h6" noWrap>
              {title}
            </Typography>
            <Typography className={classes.content} variant="body2" noWrap>
              {content}
            </Typography>

            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Typography className={classes.bottom}>{uid.company}</Typography>
              <Typography className={classes.bottom}>{uid.nickname}</Typography>
            </Grid>
            <Typography className={classes.date}>
              {moment.tz(timeTag, "Asia/Seoul").format("YY.MM.DD HH:mm")}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
export default MeetBoardList;

MeetBoardList.propTypes = {
  post: PropTypes.object
};

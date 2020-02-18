import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Fade
} from "@material-ui/core/";
import moment from "moment-timezone";
import MessageDialog from "../Dialog/MessageDialog";

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: "10px",
    marginBottom: "5px"
  },
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

function MeetBoard({ board, user_id }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDialog, setIsDialog] = React.useState(false);
  const open = Boolean(anchorEl);
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
  let commentColor = "secondary";
  if (board.uid.sex === 1) {
    sexColor = "secondary";
    commentColor = "primary";
  }
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const messageMenuClick = () => {
    setIsDialog(true);
  };
  const callbackMessageDialog = () => {
    setIsDialog(false);
    setAnchorEl(null);
  };
  return (
    <div
      style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}
    >
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

      <Typography className={classes.title} noWrap variant="h6" gutterBottom>
        {board.title}
      </Typography>
      {board.content.split("\n").map((i, key) => {
        return (
          <Typography key={key} className={classes.content} variant="body2">
            {i}
          </Typography>
        );
      })}
      <div onClick={handleMenuClick}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          style={{ paddingTop: "20px" }}
        >
          <Typography className={classes.bottom}>
            {board.uid.company}
          </Typography>

          <Typography className={classes.bottom}>
            {board.uid.nickname}
          </Typography>
        </Grid>
        <Typography className={classes.date}>
          {moment.tz(board.create_date, "Asia/Seoul").format("YY.MM.DD HH:mm")}
        </Typography>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        autoFocus
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        style={{ maxHeight: 170 }}
      >
        <MenuItem onClick={messageMenuClick} style={{ fontSize: "13px" }}>
          쪽지 보내기
        </MenuItem>
      </Menu>
      <MessageDialog
        isOpen={isDialog}
        send_uid={user_id}
        recive_uid={board.uid._id}
        recive_nickname={board.uid.nickname}
        callback={callbackMessageDialog}
      />
      <Chip
        size="small"
        label={"댓글  " + board.comments.length}
        color={commentColor}
        style={{ marginTop: "15px" }}
      />
    </div>
  );
}
export default MeetBoard;

MeetBoard.propTypes = {
  post: PropTypes.object
};

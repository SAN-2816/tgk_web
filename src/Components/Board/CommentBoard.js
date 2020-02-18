import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Menu,
  MenuItem,
  Fade
} from "@material-ui/core/";
import moment from "moment-timezone";
import MessageDialog from "../Dialog/MessageDialog";

const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: "170px",
    boxShadow: "none"
  },
  cardContent: {},
  chip: {
    marginRight: "10px",
    marginBottom: "5px"
  },
  textSmall: {
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
function CommentBoard({ comment, user_id }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDialog, setIsDialog] = React.useState(false);
  const open = Boolean(anchorEl);
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
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div onClick={handleMenuClick}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Typography className={classes.textSmall} gutterBottom>
                {comment.uid.company}
              </Typography>
              <Typography className={classes.textSmall} gutterBottom>
                {comment.uid.nickname}
              </Typography>
            </Grid>
          </div>
          <Typography variant="body1" gutterBottom>
            {comment.comment}
          </Typography>
          <Typography className={classes.date}>
            {moment
              .tz(comment.create_date, "Asia/Seoul")
              .format("YY.MM.DD HH:mm")}
          </Typography>
        </CardContent>
      </Card>
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
        recive_uid={comment.uid._id}
        recive_nickname={comment.uid.nickname}
        callback={callbackMessageDialog}
      />
      <div
        style={{
          borderBottom: "1px ridge"
        }}
      />
    </div>
  );
}

export default CommentBoard;
CommentBoard.propTypes = {
  post: PropTypes.object
};

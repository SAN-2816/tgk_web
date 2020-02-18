import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Fade,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment-timezone";
import MessageDialog from "../Dialog/MessageDialog";
import Backdrop from "../Backdrop";
import { postRemove } from "../../Axios/messageModel";

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: "none",
    marginBottom: "10px"
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

export default function MessageList({ message, callbackRemove }) {
  const classes = useStyles();
  const [isWrap, setIsWrap] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDialog, setIsDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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
  const handleClick = () => {
    setIsWrap(!isWrap);
  };
  const messageRemoveClick = async () => {
    setIsLoading(true);
    const data = await postRemove(message._id);
    if (data.complete) {
      setIsLoading(false);
      callbackRemove();
    } else {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography className={classes.bottom} gutterBottom>
              {moment
                .tz(message.create_date, "Asia/Seoul")
                .format("YY.MM.DD HH:mm")}
            </Typography>
            <IconButton size="small" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          </Grid>

          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Typography className={classes.bottom} gutterBottom>
              {message.send_uid.company}
            </Typography>
            <Typography className={classes.bottom} gutterBottom>
              {message.send_uid.nickname}
            </Typography>
          </Grid>

          <div onClick={handleClick}>
            <Typography noWrap={isWrap}>{message.content}</Typography>
          </div>
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
      >
        <MenuItem onClick={messageMenuClick} style={{ fontSize: "13px" }}>
          쪽지 보내기
        </MenuItem>
        <MenuItem onClick={messageRemoveClick} style={{ fontSize: "13px" }}>
          삭제
        </MenuItem>
        <Backdrop isLoading={isLoading} />
      </Menu>
      <MessageDialog
        isOpen={isDialog}
        send_uid={message.recive_uid._id}
        recive_uid={message.send_uid._id}
        recive_nickname={message.send_uid.nickname}
        callback={callbackMessageDialog}
      />
    </div>
  );
}

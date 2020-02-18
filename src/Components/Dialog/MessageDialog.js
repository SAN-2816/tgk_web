import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { TextField } from "@material-ui/core";
import { postSend } from "../../Axios/messageModel";
import Backdrop from "../Backdrop";
export default function MessageDialog({
  send_uid,
  recive_uid,
  recive_nickname,
  isOpen,
  callback
}) {
  const [isClick, setIsClick] = React.useState(false);
  const [isSnack, setIsSnack] = React.useState(false);
  const [isErrorSnack, setIsErrorSnack] = React.useState(false);
  let content = "";

  const handleClose = () => {
    callback();
    setIsClick(false);
  };
  const handleChange = e => {
    content = e.target.value; //target의 name을 가져옴.
  };
  const sendMessage = async () => {
    setIsClick(true);
    if (send_uid === recive_uid) {
      setIsErrorSnack(true);
      handleClose();
    } else {
      const data = await postSend(send_uid, recive_uid, content);
      if (data.complete) {
        setIsSnack(true);
        handleClose();
      } else {
        setIsErrorSnack(true);
        handleClose();
      }
    }
  };
  const closeSnack = () => {
    setIsSnack(false);
    setIsErrorSnack(false);
  };
  const setSnackbar = () => {
    return (
      <Snackbar open={isSnack} autoHideDuration={6000} onClose={closeSnack}>
        <MuiAlert onClose={closeSnack} severity="success">
          성공적으로 쪽지를 보냈습니다.
        </MuiAlert>
      </Snackbar>
    );
  };
  const setErrorSnackbar = () => {
    return (
      <Snackbar
        open={isErrorSnack}
        autoHideDuration={6000}
        onClose={closeSnack}
      >
        <MuiAlert onClose={closeSnack} severity="error">
          성공적으로 쪽지를 보내지 못했습니다.
        </MuiAlert>
      </Snackbar>
    );
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
      >
        <Backdrop isLoading={isClick} />
        <DialogTitle id="responsive-dialog-title" style={{ fontSize: "14px" }}>
          쪽지 보내기
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontSize: "13px" }}>
            * 받는사람: {recive_nickname}
          </DialogContentText>
          <TextField
            multiline
            rows={4}
            rowsMax={4}
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={sendMessage}
            color="primary"
            autoFocus
            disabled={isClick}
          >
            보내기
          </Button>
        </DialogActions>
      </Dialog>
      {setSnackbar()}
      {setErrorSnackbar()}
    </div>
  );
}

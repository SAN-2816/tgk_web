import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EmailDialog({ isOpen, callback }) {
  let open = isOpen;

  const handleClose = () => {
    open = false;
    callback();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"인증 메일이 발송되었습니다."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            인증을 위해 가입한 이메일을 확인하세요.
          </DialogContentText>
          <DialogContentText>
            * 혹시 메일이 오지 않았다면 스팸 메일함을 확인해주세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

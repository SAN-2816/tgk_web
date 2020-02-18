import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import {
  Container,
  CssBaseline,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core/";

import { findMeetBoard, pushComment } from "../Axios/meetModel";
import BoardAppBar from "../Components/AppBar/BoardAppBar";
import MeetBoard from "../Components/Board/MeetBoard";
import CommentBoard from "../Components/Board/CommentBoard";
import Backdrop from "../Components/Backdrop";

class Board extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      _id: localStorage.getItem("board_id") || "",
      user_id: cookies.get("_id") || "",
      board: {},
      comments: [],
      comment: "",
      isLoading: true,
      isClick: false
    };
  }
  componentDidMount() {
    this.getMeetView();
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value //target의 name을 가져옴.
    });
  };
  handleClick = e => {
    this.setState({
      isClick: true
    });
    this.pushMeetComment();
  };
  getMeetView = async () => {
    const data = await findMeetBoard(this.state._id);

    if (data.complete) {
      this.setState({
        board: data.message,
        comments: data.message.comments,
        isLoading: false,
        isClick: false,
        comment: ""
      });
    }
  };
  pushMeetComment = async () => {
    const data = await pushComment(
      this.state._id,
      this.state.user_id,
      this.state.comment
    );
    if (data.complete) {
      this.getMeetView();
    }
  };
  render() {
    const {
      isLoading,
      board,
      comments,
      isClick,
      comment,
      _id,
      user_id
    } = this.state;
    return (
      <div>
        <CssBaseline />
        <BoardAppBar _id={_id} />

        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div style={{ backgroundColor: "#fff" }}>
            <Container>
              <MeetBoard board={board} user_id={user_id} />

              {comments.map((item, index) => (
                <CommentBoard key={index} comment={item} user_id={user_id} />
              ))}
              <TextField
                name="comment"
                value={comment}
                onChange={this.handleChange}
                placeholder="댓글 달기"
                fullWidth
                style={{
                  boxShadow: "none",
                  paddingTop: "20px",
                  paddingBottom: "10px"
                }}
                InputProps={{
                  endAdornment: (
                    <Button
                      color="primary"
                      onClick={this.handleClick}
                      disabled={isClick}
                    >
                      입력
                    </Button>
                  )
                }}
              />
            </Container>
            <div style={{ height: "20px" }} />
          </div>
        )}
        <Backdrop isLoading={isClick} />
      </div>
    );
  }
}

export default withCookies(Board);

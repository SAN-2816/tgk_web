import React, { Component } from "react";

import { findMeetBoard } from "../Axios/meetModel";
import BoardAppBar from "../Components/AppBar/BoardAppBar";
import MeetBoard from "../Components/Board/MeetBoard";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.location.state._id,
      board: {},
      isLoading: true
    };
  }
  componentDidMount() {
    this.getMeetView();
  }
  getMeetView = async () => {
    const data = await findMeetBoard(this.state._id);
    if (data.complete) {
      this.setState({
        board: data.message,
        isLoading: false
      });
    }
  };
  render() {
    const { isLoading } = this.state;
    return (
      <div>
        <BoardAppBar />
        {isLoading ? <div></div> : <MeetBoard board={this.state.board} />}
      </div>
    );
  }
}

export default Board;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CssBaseline, Fab, CircularProgress } from "@material-ui/core/";
//import Skeleton from "@material-ui/lab/Skeleton";

import MeetBoardList from "../Components/Board/MeetBoardList";
import MainAppBar from "../Components/AppBar/MainAppBar";
import EditIcon from "@material-ui/icons/Edit";
import { getMeetBoard } from "../Axios/meetModel";
import "../Css/Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meetBoards: [],
      isLoading: true,
      isRedirect: false
    };
  }
  componentDidMount() {
    this.getMeetBoard();
  }
  getMeetBoard = async () => {
    const data = await getMeetBoard(0);
    if (data.complete) {
      console.log(data);
      this.setState({
        meetBoards: data.message,
        isLoading: false
      });
    }
  };
  render() {
    const { isLoading, meetBoards } = this.state;
    return (
      <div>
        <CssBaseline />
        <MainAppBar />
        {isLoading ? (
          <div>
            <CircularProgress color="primary" />
          </div>
        ) : (
          meetBoards.map((item, index) => (
            <MeetBoardList
              key={item._id}
              _id={item._id}
              uid={item.uid}
              title={item.title}
              content={item.content}
              personTag={item.personTag}
              regionTag={item.regionTag}
              ageTag={item.ageTag}
              timeTag={item.create_date}
            />
          ))
        )}
        <Link to="/tagchoice">
          <Fab
            color="secondary"
            aria-label="edit"
            style={{ position: "fixed", bottom: 20, right: 20 }}
            size="small"
          >
            <EditIcon />
          </Fab>
        </Link>
      </div>
    );
  }
}

export default Main;

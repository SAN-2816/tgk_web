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
      page: 0,
      meetBoards: [],
      isLoading: true,
      isRedirect: false,
      isScrolling: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.getMeetBoard(this.state.page);
  }
  componentWillUnmount() {
    // 언마운트 될때에, 스크롤링 이벤트 제거
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.

    if (scrollHeight - innerHeight - scrollTop < 100) {
      if (!this.state.isScrolling) {
        this.setState({
          isScrolling: true,
          page: this.state.page + 10
        });
        this.getMeetBoard(this.state.page);
      }
    }
  };
  getMeetBoard = async page => {
    const data = await getMeetBoard(page);
    if (data.complete) {
      this.setState({
        meetBoards: this.state.meetBoards.concat(data.message),
        isLoading: false,
        isScrolling: false
      });
    }
  };
  render() {
    const { isLoading, meetBoards } = this.state;
    return (
      <div>
        <CssBaseline />
        <MainAppBar props={this.props} />
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

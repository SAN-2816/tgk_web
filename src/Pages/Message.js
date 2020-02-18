import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { CssBaseline, Container, CircularProgress } from "@material-ui/core/";
import { postGet } from "../Axios/messageModel";
import MessageList from "../Components/Message/MessageList";
import BackAppBar from "../Components/AppBar/BackAppBar";

class Message extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      uid: cookies.get("_id"),
      messages: [],
      page: 0,
      isLoading: true,
      isScrolling: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.getMessage(this.state.page);
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
        this.getMessage(this.state.page);
      }
    }
  };
  getMessage = async page => {
    const data = await postGet(this.state.uid, page);
    if (data.complete) {
      this.setState({
        messages: this.state.messages.concat(data.message),
        isScrolling: false,
        isLoading: false
      });
    }
  };
  callbackRemove = () => {
    this.setState({
      messages: []
    });
    this.getMessage(0);
  };
  render() {
    const { isLoading, messages } = this.state;
    return (
      <div>
        <CssBaseline />
        <BackAppBar name="쪽지함" />
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
          messages.map((item, index) => (
            <MessageList
              key={index}
              message={item}
              callbackRemove={this.callbackRemove}
            />
          ))
        )}
      </div>
    );
  }
}

export default withCookies(Message);

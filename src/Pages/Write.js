import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CssBaseline, Container, Chip, TextField } from "@material-ui/core";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import WriteAppBar from "../Components/AppBar/WriteAppBar";
import { createMeetBoard } from "../Axios/meetModel";

class Write extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      uid: cookies.get("_id"),
      title: "",
      content: "",
      person: this.props.location.state.person,
      personString: this.props.location.state.personString,
      region: this.props.location.state.region,
      age: this.props.location.state.age,
      isRedirect: false
    };
  }
  callbackRegist = dataFromChild => {
    console.log(this.state.content);
    this.postCreateMeetBoard();
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value //target의 name을 가져옴.
    });
  };
  chipView = () => {
    return (
      <div>
        <Chip
          size="small"
          label={this.state.personString}
          color="primary"
          style={{ marginRight: "10px" }}
        />
        <Chip
          size="small"
          label={this.state.region}
          color="primary"
          style={{ marginRight: "10px" }}
        />
        <Chip
          size="small"
          label={this.state.age}
          color="primary"
          style={{ marginRight: "10px" }}
        />
      </div>
    );
  };
  postCreateMeetBoard = async () => {
    const data = await createMeetBoard(
      this.state.uid,
      this.state.title,
      this.state.content,
      this.state.person,
      this.state.region,
      this.state.age
    );
    console.log(data);
    if (data.complete) {
      this.setState({ isRedirect: true });
    } else {
      this.setState({ isRedirect: false });
    }
  };
  render() {
    const { isRedirect } = this.state;
    if (isRedirect) {
      return <Redirect to="/main" />;
    }
    return (
      <div style={{ background: "#fff" }}>
        <WriteAppBar callbackRegist={this.callbackRegist} />
        <Container style={{ marginTop: "20px" }}>
          <CssBaseline />
          {this.chipView()}
          <TextField
            label="제목"
            fullWidth
            style={{ marginTop: "30px" }}
            name="title"
            onChange={this.handleChange}
          />
          <TextField
            label="내용"
            multiline
            rows={10}
            rowsMax={20}
            fullWidth
            style={{ marginTop: "30px" }}
            color="primary"
            name="content"
            onChange={this.handleChange}
          />
        </Container>
      </div>
    );
  }
}
export default withCookies(Write);

import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import {
  Container,
  CssBaseline,
  TextField,
  Button,
  Grid
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import User from "../Axios/userModel";
import "../Css/SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nickname: "",
      company: "",
      confirm: "",
      isLoading: false
    };
    this.postUser.bind();
  }

  handleClick = e => {
    const { password, confirm } = this.state;
    this.setState({
      isLoading: true
    });
    if (password === confirm) {
      this.postUser();
    } else {
      console.log("xxx");
      this.setState({
        isLoading: false
      });
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value //target의 name을 가져옴.
    });
  };

  createNickname = e => {
    const minNum = 2;
    const maxNum = 10;
    const rand = minNum + Math.random() * (maxNum - minNum);
    this.setState({
      nickname: rand
    });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("위 비밀번호와 다릅니다.");
    } else {
      callback();
    }
  };
  postUser = async () => {
    const data = await User(
      this.state.email,
      this.state.password,
      this.state.nickname,
      this.state.company
    );
    console.log(data);
    if (data.complete) {
      this.setState({ isSignUp: true });
    } else {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { isLoading, isSignUp } = this.state;
    if (isSignUp) {
      return <Redirect to="/" />;
    }
    return (
      <Container component="signup-container" maxWidth="xs">
        <div className="signup-header">
          <Grid container>
            <Grid>
              <Link to="/">
                <ArrowBackIosIcon color="primary" fontSize="small" />
              </Link>
            </Grid>
            <Grid>
              <div className="signup-title">회원가입</div>
            </Grid>
          </Grid>
        </div>
        <div className="signup-text">정보를 입력해주세요.</div>
        <CssBaseline />
        <div className="signup-paper">
          <form className="signup-form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nickname"
                  variant="outlined"
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임(클릭시 랜덤생성)"
                  disabled={true}
                  onClick={this.createNickname}
                  value={this.state.nickname}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="회사 이메일"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="company"
                  label="회사 명"
                  name="company"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirm"
                  label="비밀번호 확인"
                  type="password"
                  id="confirm"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="signup-button"
              disabled={isLoading}
              onClick={this.handleClick}
            >
              회원가입
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default SignUp;

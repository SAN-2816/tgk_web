import React, { Component } from "react";

import { Redirect, Link } from "react-router-dom";

import {
  Container,
  CssBaseline,
  TextField,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormLabel,
  FormControlLabel
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import User from "../Axios/userModel";
import { randomKorean } from "../Etc/randomKorean";
import "../Css/SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      informText: "정보를 입력해주세요.",
      email: "",
      password: "",
      nickname: "",
      company: "",
      confirm: "",
      sex: 3,
      isLoading: false
    };
  }

  handleClick = e => {
    const { password, confirm, sex } = this.state;
    this.setState({
      isLoading: true
    });
    if (password === confirm) {
      this.postUser();
    } else {
      this.setState({
        informText: "비밀번호가 다릅니다.",
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
    const maxNum = 6;
    const rand = Math.round(minNum + Math.random() * (maxNum - minNum));
    this.setState({
      nickname: randomKorean(rand)
    });
  };
  postUser = async () => {
    const data = await User(
      this.state.email,
      this.state.password,
      this.state.nickname,
      this.state.company,
      this.state.sex
    );
    console.log(data);
    if (data.complete) {
      this.setState({ isSignUp: true });
    } else {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { informText, isLoading, isSignUp } = this.state;
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
        <div className="signup-text">{informText}</div>
        <CssBaseline />
        <div className="signup-paper">
          <form className="signup-form" noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nickname"
                  variant="filled"
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
              <Grid item xs={12}>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <FormLabel style={{ marginRight: "20px" }}>성별</FormLabel>
                  <RadioGroup name="sex" onChange={this.handleChange} row>
                    <FormControlLabel
                      value="0"
                      control={<Radio color="primary" />}
                      label="남성"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="여성"
                    />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>
            <div className="form-button">
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
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

export default SignUp;

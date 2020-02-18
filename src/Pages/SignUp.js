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
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Collapse
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import User from "../Axios/userModel";
import { randomKorean } from "../Etc/randomKorean";
import EmailDialog from "../Components/Dialog/EmailDialog";
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
      sex: 3,
      isLoading: false,
      isError: false,
      isSignUp: false,
      isEnd: false,
      textError: "",
      service: false,
      personal: false,
      marketing: false
    };
  }

  handleClick = e => {
    const {
      email,
      password,
      nickname,
      company,
      confirm,
      sex,
      service,
      personal,
      marketing
    } = this.state;
    this.setState({
      isLoading: true
    });
    if (email === "" || password === "" || nickname === "" || company === "") {
      this.setState({
        isLoading: false,
        isError: true,
        textError: "빈 공간이 있습니다."
      });
    } else if (sex === 3) {
      this.setState({
        isLoading: false,
        isError: true,
        textError: "성별을 선택해주세요."
      });
    } else if (password !== confirm) {
      this.setState({
        isLoading: false,
        isError: true,
        textError: "비밀번호가 다릅니다."
      });
    } else if (!service || !personal) {
      this.setState({
        isLoading: false,
        isError: true,
        textError: "필수 이용 약관 동의가 필요합니다."
      });
    } else {
      this.postUser();
    }
  };

  handleChange = e => {
    this.setState({
      isError: false,
      [e.target.name]: e.target.value //target의 name을 가져옴.
    });
  };
  checkboxChange = e => {
    this.setState({
      isError: false,
      [e.target.name]: e.target.checked //target의 name을 가져옴.
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

    if (data.complete) {
      this.setState({ isSignUp: true });
    } else {
      this.setState({
        isLoading: false,
        isError: true,
        textError: "중복된 닉네임 또는 중복된 이메일 입니다."
      });
    }
  };
  callbackDialog = () => {
    this.setState({ isSignUp: false, isEnd: true });
  };
  render() {
    const { isLoading, isSignUp, isError, isEnd, textError } = this.state;
    if (isEnd) {
      return <Redirect to="/" />;
    }
    return (
      <Container component="signup-container" maxWidth="xs">
        <EmailDialog isOpen={isSignUp} callback={this.callbackDialog} />
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
            <FormControl
              component="fieldset"
              fullWidth
              style={{ marginTop: "20px" }}
            >
              <FormGroup row>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.service}
                        onChange={this.checkboxChange}
                        name="service"
                        value="service"
                        size="small"
                      />
                    }
                    label="(필수) 서비스 이용 약관 동의"
                  />
                  <Link to="/agree/0" style={{ textDecoration: "none" }}>
                    <Button size="small" color="primary">
                      click
                    </Button>
                  </Link>
                </Grid>
              </FormGroup>
              <FormGroup row>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.personal}
                        onChange={this.checkboxChange}
                        name="personal"
                        value="personal"
                        size="small"
                      />
                    }
                    label="(필수) 개인정보 이용 약관 동의"
                  />
                  <Link to="/agree/1" style={{ textDecoration: "none" }}>
                    <Button size="small" color="primary">
                      click
                    </Button>
                  </Link>
                </Grid>
              </FormGroup>
              <FormGroup row>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.marketing}
                        onChange={this.checkboxChange}
                        name="marketing"
                        value="marketing"
                        size="small"
                      />
                    }
                    label="(선택) 마케팅 정보 수신 동의"
                  />
                  <Link to="/agree/2" style={{ textDecoration: "none" }}>
                    <Button size="small" color="primary">
                      click
                    </Button>
                  </Link>
                </Grid>
              </FormGroup>
            </FormControl>
            <Collapse in={isError}>
              <Alert severity="error">{textError}</Alert>
            </Collapse>
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

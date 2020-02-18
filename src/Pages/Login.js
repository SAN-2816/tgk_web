import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  CssBaseline,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  ButtonGroup,
  Collapse,
  Box,
  Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { postLogin, postAutoLogin } from "../Axios/loginModel";
import Backdrop from "../Components/Backdrop";
import logo from "../Images/logo512.png";
import "../Css/Login.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      4PEEPS 2020
      {"."}
    </Typography>
  );
}

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = {
      email: "",
      password: "",
      isLogin: false,
      isAutoLogin: cookies.get("autoLogin") || false,
      isLoading: false,
      isError: false,
      textError: ""
    };
  }
  componentDidMount() {
    if (this.state.isAutoLogin === "true") {
      //타입오류때문에 "true"

      const { cookies } = this.props;
      const _id = cookies.get("_id");
      const token = cookies.get("token");
      this.postAutoLogin(_id, token);
    }
  }

  handleCheck = e => {
    this.setState({
      isAutoLogin: e.target.checked
    });
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value //target의 name을 가져옴.
    });
  };
  handleClick = e => {
    this.setState({
      isLoading: true
    });
    if (this.state.email === "" || this.state.password === "") {
      this.setState({
        isError: true,
        isLoading: false,
        textError: "이메일이나 비밀번호를 확인해주세요."
      });
    } else {
      this.postLogin();
    }
  };

  postLogin = async () => {
    const data = await postLogin(this.state.email, this.state.password);

    if (data.complete) {
      if (data.message.auth) {
        //인증 여부 확인해야함.
        const { cookies } = this.props;
        cookies.set("_id", data.message._id, { path: "/" });
        cookies.set("token", data.message.token, { path: "/" });
        cookies.set("autoLogin", this.state.isAutoLogin, { path: "/" });
        this.setState({ isLogin: true });
      } else {
        //오류메세지 출력
        this.setState({
          isError: true,
          isLoading: false,
          textError: "이메일 인증을 확인해주세요."
        });
      }
    } else {
      this.setState({
        isError: true,
        isLoading: false,
        textError: "이메일이나 비밀번호를 확인해주세요."
      });
    }
  };
  postAutoLogin = async (_id, token) => {
    const data = await postAutoLogin(_id, token);

    if (data.complete) {
      this.setState({
        isLogin: true
      });
    } else {
      const { cookies } = this.props;
      cookies.remove("_id");
      cookies.remove("token");
      cookies.remove("autoLogin");
      this.setState({
        isError: true,
        isLoading: false,
        textError: "인증이 올바르지 않습니다. 다시 로그인해주세요."
      });
    }
  };
  render() {
    const { isLoading, isLogin, isError, textError } = this.state;
    if (isLogin) {
      return <Redirect to="/main" />;
    }
    return (
      <div className="Login">
        <Container className="login-container">
          <CssBaseline />
          <div className="logo-form">
            <img className="logo" src={logo} alt="" style={{ width: "55%" }} />
          </div>
          <form className="login-form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <Collapse in={isError}>
              <Alert severity="error">{textError}</Alert>
            </Collapse>
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={this.handleCheck}
                />
              }
              label="자동 로그인"
              style={{ marginTop: "5px" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              disabled={isLoading}
              style={{ marginTop: "10px" }}
            >
              로그인
            </Button>
          </form>
          <ButtonGroup
            size="small"
            variant="text"
            orientation="horizontal"
            style={{
              marginTop: "30px",
              color: "#9e9e9e"
            }}
            fullWidth
          >
            <Button component={Link} to="/signup" style={{ color: "#9e9e9e" }}>
              회원가입
            </Button>
            <Button style={{ color: "#9e9e9e" }}>비밀번호찾기</Button>
          </ButtonGroup>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>

        <Backdrop isLoading={isLoading} />
      </div>
    );
  }
}
export default withCookies(Login);

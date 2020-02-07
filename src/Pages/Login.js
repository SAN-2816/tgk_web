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
  ButtonGroup
} from "@material-ui/core";
import { postLogin, postAutoLogin } from "../Axios/loginModel";
import logo from "../Images/logo512.png";
import "../Css/Login.css";

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
      isLoading: false
    };
  }
  componentDidMount() {
    if (this.state.isAutoLogin === "true") {
      //타입오류때문에 "true"
      console.log(this.state.isAutoLogin);
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
    this.postLogin();
  };

  postLogin = async () => {
    const data = await postLogin(this.state.email, this.state.password);
    console.log(data);
    if (data.complete) {
      const { cookies } = this.props;
      cookies.set("_id", data.message._id, { path: "/" });
      cookies.set("token", data.message.token, { path: "/" });
      cookies.set("autoLogin", this.state.isAutoLogin, { path: "/" });
      this.setState({ isLogin: true });
    } else {
      this.setState({ isLoading: false });
    }
  };
  postAutoLogin = async (_id, token) => {
    const data = await postAutoLogin(_id, token);
    console.log(data);
    if (data.complete) {
      this.setState({
        isLogin: true
      });
    }
  };

  render() {
    const { isLoading, isLogin } = this.state;
    if (isLogin) {
      return <Redirect to="/main" />;
    }
    return (
      <div className="Login">
        <Container className="login-container">
          <CssBaseline />
          <div className="logo-form">
            <img className="logo" src={logo} alt="" style={{ width: "50%" }} />
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
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={this.handleCheck}
                />
              }
              label="자동 로그인"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.handleClick}
              disabled={isLoading}
            >
              로그인
            </Button>
          </form>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <ButtonGroup variant="text" aria-label="text primary button group">
              <Button component={Link} to="/signup">
                회원가입
              </Button>
              <Button>아이디찾기</Button>
              <Button>비밀번호찾기</Button>
            </ButtonGroup>
          </div>
        </Container>
      </div>
    );
  }
}
export default withCookies(Login);

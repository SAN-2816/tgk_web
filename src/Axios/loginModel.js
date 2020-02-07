import axios from "axios";

export const postLogin = async (email, password) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/user/login`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        email: email,
        password: password
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const postAutoLogin = async (_id, token) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/user/autologin`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        _id: _id,
        token: token
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

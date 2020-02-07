import axios from "axios";

async function user(email, password, nickname, company, sex) {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/user/signup`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        email: email,
        password: password,
        nickname: nickname,
        company: company,
        sex: sex
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default user;

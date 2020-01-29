import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function user(email, password, nickname, company) {
  try {
    const response = await axios.post(`http://localhost:4000/api/user/signup`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      email: email,
      password: password,
      nickname: nickname,
      company: company
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default user;

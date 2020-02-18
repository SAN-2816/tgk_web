import axios from "axios";

export const postSend = async (send_uid, recive_uid, content) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/message/send`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        send_uid: send_uid,
        recive_uid: recive_uid,
        content: content
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const postGet = async (recive_uid, indexPage) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/message/get`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        recive_uid: recive_uid,
        indexPage: indexPage
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const postRemove = async _id => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/message/remove`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        _id: _id
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

import axios from "axios";

export const getMeetBoard = async index => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/board/getMeet`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        indexPage: index
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const createMeetBoard = async (
  uid,
  title,
  content,
  person,
  region,
  age
) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/board/createMeet`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        uid: uid,
        title: title,
        content: content,
        personTag: person,
        regionTag: region,
        ageTag: age
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const findMeetBoard = async _id => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_TGK_SERVER + `/api/board/findMeet`,
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

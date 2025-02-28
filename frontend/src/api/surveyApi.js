import axios from "axios";

export const submitSurvey = async (responses) => {
  return axios.post("http://localhost:5000/api/survey", { responses });
};

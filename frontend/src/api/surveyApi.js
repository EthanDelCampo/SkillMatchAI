import axios from "axios";

export const submitSurvey = async (responses) => {
  return axios.post("http://localhost:8080/api/survey", { responses });
};

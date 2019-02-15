import API from "./baseService";

import { Question } from "../interfaces";

export const getQuestions = () =>
  API.get("/api.php?amount=10&difficulty=easy").then(response => {
    if (response.status === 200) {
      return response.data;
    }
    return null;
  });

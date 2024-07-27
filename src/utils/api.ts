import axios from "axios";

const apiKey = "6e9266b";

export const api = axios.create({
  baseURL: "http://www.omdbapi.com/",
  params: {
    apikey: apiKey,
  },
});

export default api;
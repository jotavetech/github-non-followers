import axios from "axios";

const token = import.meta.env.VITE_GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: `https://api.github.com/users`,
  headers: {
    Authorization: `token ${token}`,
  },
});

export default githubApi;

import axios from "axios";
import env from "@/env";

const axiosInst = axios.create({
  // baseURL: "http://localhost:7777",
  baseURL: env.api.MAIN_API_URL,
  timeout: 2500,
});

const axiosInstToApi = axios.create({
  baseURL: "https://api.tosspayments.com",
  timeout: 2500,
});

const springAxiosInst = axiosInst;

export default { axiosInst, springAxiosInst, axiosInstToApi };

import axios from "axios";
import AppConfig from "./apiConfig";
import { methodType } from "./apiEndPoints";
import { clearStorage, getStorage, getUserToken, signOut } from "../../helper/storage";
// import { getUserToken, signOut } from "@/helper/storage";

axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    const {
      response: { data },
      response,
    } = error;
    // write 401 case condition here
    if (
      response?.status === 401 &&
      !response?.config?.url?.includes("login") &&
      !(response?.config?.url?.search("change_password") > 0)
    ) {
      clearStorage();
      return Promise.reject(error);
    }
    if (data) {
      return data;
    } else {
      return Promise.reject(error);
    }
  }
);

export const performRequest = async (
  method,
  url,
  data = {},
  token = false,
  formData = false
) => {
  url = url.replaceAll("#", "%23");
  const config = {
    method,
    url,
  };

  if (
    method === methodType.PUT ||
    method === methodType.PATCH ||
    method === methodType.POST ||
    method === methodType.DELETE
  ) {
    config.data = data;
  }

  if (method === methodType.GET) {
    config.params = data;
  }

  if (formData) {
    config.headers = {
      "Content-Type":
        "multipart/form-data; boundary=<calculated when request is sent>",
    };
  } else {
    config.headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
  }
  if (token) {
    let key = getStorage("logged-in") || null;
    config.headers.Authorization = `Bearer ${key}`;
  }

  config.headers["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return axios(config);
};

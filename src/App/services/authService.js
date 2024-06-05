import config from "./_apiConfig/apiConfig";
import { performRequest, apiEndPoints, methodType } from "./_apiConfig";

export const userLogin = (data = {}) => {
  return performRequest(
    methodType.POST,
    config.baseURL + apiEndPoints.authLogin + '?' + data,
    {},
    false,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
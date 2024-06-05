import config from "./_apiConfig/apiConfig";
import { performRequest, apiEndPoints, methodType } from "./_apiConfig";

export const getCustomers = (data = {}) => {
  return performRequest(
    methodType.GET,
    config.baseURL + apiEndPoints.customer + "GetList",
    data,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const createCustomers = (data = {}) => {
  console.log("data", data)
  return performRequest(
    methodType.POST,
    config.baseURL + apiEndPoints.customer + "Insert",
    data,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteCustomers = (id) => {
  return performRequest(
    methodType.DELETE,
    config.baseURL + apiEndPoints.customer + 'Delete' + "/" + id,
    {},
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const editCustomers = (data = {}) => {
  return performRequest(
    methodType.PUT,
    config.baseURL + apiEndPoints.customer + 'Update',
    data,
    true,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

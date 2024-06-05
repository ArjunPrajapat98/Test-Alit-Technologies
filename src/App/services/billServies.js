import config from "./_apiConfig/apiConfig";
import { performRequest, apiEndPoints, methodType } from "./_apiConfig";

export const getBillList = () => {
  return performRequest(
    methodType.GET,
    config.baseURL + apiEndPoints.bill + "GetList" + '/',
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

export const createBills = (data = {}) => {
  return performRequest(
    methodType.POST,
    config.baseURL + apiEndPoints.bill + "Insert",
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

export const deleteBills = (id) => {
  return performRequest(
    methodType.DELETE,
    config.baseURL + apiEndPoints.bill + 'Delete' + "/" + id,
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

export const editBills = (data = {}) => {
  return performRequest(
    methodType.PUT,
    config.baseURL + apiEndPoints.bill + 'Update',
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

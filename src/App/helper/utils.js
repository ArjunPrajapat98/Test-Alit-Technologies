import { constant } from "./constant";

Array.prototype.mapWithKey = function (callback) {
  let newArray = [];
  for (let index = 0; index < this.length; index++) {
    let counter = callback(
      this[index],
      JSON.stringify(this[index]),
      index,
      this
    );
    newArray.push(counter);
  }
  return newArray;
};

export const utils = {
  isEqualObject: (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2),

  isObjectValueEmpty: (obj) =>
    Object.values(obj).every(
      (item) => item !== "" || item !== "undefined" || item !== undefined
    )
      ? true
      : false,

  isObjectKeyEmpty: (obj) => (Object.keys(obj).length ? false : true),
  isObjectKeyExist: (obj, key) => Object.keys(obj).includes(key),

  checkFormError: async (inputValue, schema) => {
    try {
      const validationResult = await schema.validate(inputValue, {
        abortEarly: false,
      });
      return !!validationResult;
    } catch (error) {
      let obj = {};
      error?.inner?.forEach((vr) => {
        obj[vr.path] = vr.errors[0];
      });
      return obj;
    }
  },
  getResposeError: (resError) => {
    let error = "";
    if (typeof resError === "string") {
      error = resError;
    } else {
      for (const key in resError) {
        if (Object.hasOwnProperty.call(resError, key)) {
          error =
            typeof resError[key] === "string"
              ? resError[key]
              : resError[key][0];
        }
      }
    }
    return error;
  },

  getResponseAllErrors: (resError) => {
    let error = {};
    for (const key in resError) {
      if (Object.hasOwnProperty.call(resError, key)) {
        error[key] = resError[key][0];
      }
    }
    return error;
  },

  queryString: (params) =>
    Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&"),

  formatDate: (date = "") => {
    if (!date) {
      return "";
    }
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    return `${day}/${month}/${year}`;
  },
};

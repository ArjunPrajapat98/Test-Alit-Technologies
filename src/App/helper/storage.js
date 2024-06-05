export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = (key) => {
  let value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const removeStorage = (key) => {
  let value = localStorage.removeItem(key);
  return value ? JSON.parse(value) : null;
};

export const clearStorage = (callBack) => {
  localStorage.clear();
  window.location.href = "/login";
  if (callBack) {
    callBack();
  }
};

export const getUserDetails = () => {
  let value = getStorage("logged-in");
  return value;
};

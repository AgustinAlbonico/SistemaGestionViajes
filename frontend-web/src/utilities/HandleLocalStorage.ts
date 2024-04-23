import { BackendResponse } from "@/pages/Login";

export const removeLocalStorage = () => {
  localStorage.removeItem("auth");
};

export const getLocalStorageData = () => {
  const unparsedJson = localStorage.getItem("auth");
  if (unparsedJson) {
    const data: BackendResponse = JSON.parse(unparsedJson);
    return data
  }
};

import { showErrorToast, showInfoToast } from "../utils/toastFunctions";
import axios from "axios";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContextProvider";

export const fetchUserInfo = async (setLoggedUser) => {
  const { logout } = useAuth;

  try {
    const response = await axios.get(`${API_URL}/auth/users`);
    if (setLoggedUser) {
      setLoggedUser({
        nombre: response.data.user.nombre,
        apellido: response.data.user.apellido,
      });
    }
  } catch (error) {
    const { status, data } = error.response;
    if (status === 400 && !data.authenticated) {
      showInfoToast(data.message);
    } else if (status === 500) {
      showErrorToast(data.message);
    }
    logout();
  }
};

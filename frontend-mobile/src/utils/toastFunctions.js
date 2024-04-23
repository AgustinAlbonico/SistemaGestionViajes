import Toast from "react-native-toast-message";

export const showSuccessToast = (text2) => {
  Toast.show({
    type: "success",
    text1: "EXITO",
    text2,
    visibilityTime: 2000,
    swipeable: true,
    topOffset: 80,
  });
};

export const showErrorToast = (text2) => {
  Toast.show({
    type: "error",
    text1: "ERROR",
    text2,
    visibilityTime: 2000,
    swipeable: true,
    topOffset: 80,
  });
};

export const showInfoToast = (text2) => {
  Toast.show({
    type: "info",
    text1: "ATENCION",
    text2,
    visibilityTime: 4000,
    swipeable: true,
    topOffset: 80,
  });
};

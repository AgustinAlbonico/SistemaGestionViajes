import { Vibration } from "react-native";

export const vibrate = (miliseconds) => {
    return Vibration.vibrate(miliseconds)
}
import { Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthContextProvider, {
  useAuth,
} from "./src/context/AuthContextProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import { StatusBar } from "expo-status-bar";
import NuevoViaje from "./src/screens/NuevoViaje";
import MisViajes from "./src/screens/MisViajes";
import EditarViaje from "./src/screens/EditarViaje";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar backgroundColor={"#332B47"} />
      <Layout />
      <Toast />
    </AuthContextProvider>
  );
}

export const Layout = () => {
  const { authState, logout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Inicio"
            component={Home}
            options={{
              headerRight: () => (
                <Button
                  onPress={() =>
                    Alert.alert(
                      "Atención",
                      "Esta seguro de cerrar su sesión?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        { text: "OK", onPress: () => logout() },
                      ]
                    )
                  }
                  title="Cerrar sesion"
                  color={"red"}
                />
              ),
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen
          name="Nuevo viaje"
          component={NuevoViaje}
          options={{
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="Mis viajes"
          component={MisViajes}
          options={{
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="Editar viaje"
          component={EditarViaje}
          options={{
            animation: "fade",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

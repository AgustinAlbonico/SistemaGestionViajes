import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { fetchUserInfo } from "../utils/fetchUserInfo";
import { useAuth } from "../context/AuthContextProvider";
import * as SecureStore from "expo-secure-store";
import { vibrate } from "../utils/vibrate";

const Home = ({ navigation }) => {
  const [loggedUser, setLoggedUser] = useState({
    nombre: "",
    apellido: "",
  });

  useEffect(() => {
    //fetchUserInfo(setLoggedUser);
    const getUserCookie = async () => {
      let { nombre, apellido } = JSON.parse(
        await SecureStore.getItemAsync("access_token")
      );
      setLoggedUser({
        apellido,
        nombre,
      });
    };
    getUserCookie();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text
          style={{
            color: "#524571",
            textAlign: "center",
            fontSize: 54,
            padding: 0,
            fontWeight: "bold",
            paddingBottom: 50,
          }}
        >
          Menu
        </Text>
        <View style={{ width: "100%", alignItems: "center", rowGap: 20 }}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: "#524571",
                borderRadius: 8,
                width: "80%",
                display: "flex",
                padding: 20,
              },
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => {
              navigation.navigate("Nuevo viaje");
              vibrate(100);
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20,
                color: "white",
              }}
            >
              Nuevo viaje
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: "#524571",
                borderRadius: 8,
                width: "80%",
                display: "flex",
                padding: 20,
              },
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => {
              navigation.navigate("Mis viajes");
              vibrate(100);
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 20,
                color: "white",
              }}
            >
              Ver viajes
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: "#524571",
            textAlign: "center",
            fontSize: 32,
            padding: 0,
            marginTop: 40,
            fontWeight: "bold",
            paddingBottom: 0,
          }}
        >
          Bienvenido {"\n"}
          {`${loggedUser.apellido}, ${loggedUser.nombre}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "80%",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;

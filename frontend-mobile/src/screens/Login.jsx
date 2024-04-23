import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../context/AuthContextProvider";

import Svg, { Path, G, Circle } from "react-native-svg";

const Home = () => {
  const { login, loading } = useAuth();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "80%",
          width: "80%",
        }}
      >
        <View
          style={{
            height: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            rowGap: 20,
          }}
        >
          <Text
            style={{
              color: "#524571",
              textAlign: "center",
              fontSize: 54,
              padding: 0,
              fontWeight: "bold",
            }}
          >
            Iniciar sesión
          </Text>

          <View style={styles.login_form}>
            <View style={styles.input_container}>
              <Text style={styles.input_container__label}>Usuario:</Text>
              <View style={{ justifyContent: "center" }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ position: "absolute", left: -34 }}
                >
                  <Path
                    fill="#323232"
                    d="M17 8A5 5 0 1 1 7 8a5 5 0 0 1 10 0Z"
                    opacity={0.1}
                  />
                  <Path
                    stroke="#323232"
                    strokeWidth={2}
                    d="M17 8A5 5 0 1 1 7 8a5 5 0 0 1 10 0Z"
                  />
                  <Path
                    stroke="#323232"
                    strokeLinecap="round"
                    strokeWidth={2}
                    d="M3 21c.957-3.076 3.42-4 9-4s8.043.924 9 4"
                  />
                </Svg>
                <TextInput
                  style={styles.input_container__input}
                  placeholder="Usuario"
                  value={user}
                  onChangeText={(text) => setUser(text)}
                  autoCapitalize="none"
                />
              </View>
              {errorUser.length > 0 && (
                <Text style={styles.error}>{errorUser}</Text>
              )}
            </View>
            <View>
              <Text style={styles.input_container__label}>Contraseña:</Text>
              <View style={{ justifyContent: "center" }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  viewBox="0 0 48 48"
                  style={{ position: "absolute", left: -34 }}
                >
                  <G data-name="Layer 2">
                    <Path
                      fill="none"
                      d="M0 0h48v48H0z"
                      data-name="invisible box"
                    />
                    <G data-name="Layer 7">
                      <Path d="M39 18h-4v-5A11 11 0 0 0 24 2h-2a11 11 0 0 0-11 11v5H7a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2V20a2 2 0 0 0-2-2Zm-24-5a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v5H15Zm22 29H9V22h28Z" />
                      <Circle cx={15} cy={32} r={3} />
                      <Circle cx={23} cy={32} r={3} />
                      <Circle cx={31} cy={32} r={3} />
                    </G>
                  </G>
                </Svg>
                <TextInput
                  style={styles.input_container__input}
                  placeholder="Contraseña"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  textContentType="password"
                  autoCapitalize="none"
                />
              </View>
              {errorPassword.length > 0 && (
                <Text style={styles.error}>{errorPassword}</Text>
              )}
            </View>
          </View>

          <Pressable
            style={({pressed}) => [
              {
                backgroundColor: "#524571",
                borderRadius: 8,
                width: "50%",
                display: "flex",
                padding: 20,
              },
              pressed && {opacity: .8}
            ]}
            onPress={() => {
              if (user.length === 0) setErrorUser("Usuario vacio");
              else setErrorUser("");
              if (password.length === 0) setErrorPassword("Contraseña vacia");
              else setErrorPassword("");
              if (user.length > 0 && password.length > 0) {
                setErrorUser("");
                setErrorPassword("");
                login(user, password);
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size={24} />
            ) : (
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 20,
                  color: "white",
                }}
              >
                Iniciar sesión
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  container: {
    height: "100%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  login_form: {
    height: "50%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 20,
  },
  input_container: {},
  input_container__label: {
    fontSize: 18,
    paddingBottom: 10,
  },
  input_container__input: {
    padding: 15,
    borderRadius: 8,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
});

export default Home;

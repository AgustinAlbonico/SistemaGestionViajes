import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Vibration,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showErrorToast } from "../utils/toastFunctions";
import axios from "axios";
import { API_URL } from "../context/AuthContextProvider";
import ViajeItem from "../components/ViajeItem";
import { fetchUserInfo } from "../utils/fetchUserInfo";

const MisViajes = () => {
  const [viajes, setViajes] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [page, setPage] = useState(1);
  const [enabledScroll, setEnabledScoll] = useState(false);

  const navigation = useNavigation();

  const cantTotalViajes = useRef(0);
  const cantTotalPaginas = useRef(0);

  const getViajes = async () => {
    if (page === 1) setLoadingPage(true);
    try {
      setEnabledScoll(false);
      const response = await axios.get(
        `${API_URL}/viaje?limit=10&page=${page}`
      );
      cantTotalViajes.current = response.data.info.count;
      cantTotalPaginas.current = response.data.info.pages;
      setViajes([...viajes, ...response.data.results]);
    } catch (error) {
      if (error.response.data.message)
        showErrorToast(error.response.data.message);
      else {
        showErrorToast("Error al cargar los viajes");
      }
      navigation.navigate("Inicio");
    } finally {
      if (page === 1) {
        setLoadingPage(false);
      } else {
        setLoadingItems(false);
      }
      setEnabledScoll(true);
    }
  };

  const loadMoreItems = () => {
    if (page < cantTotalPaginas.current) {
      setLoadingItems(true);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    Vibration.vibrate(200);
  }, []);

  useEffect(() => {
    getViajes();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      {loadingPage ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={viajes}
          renderItem={(viaje) => <ViajeItem viaje={viaje} />}
          scrollEnabled={enabledScroll}
          contentContainerStyle={{
            gap: 12,

            alignItems: "center",
          }}
          style={{ width: "100%", flex: 1, conte: "center" }}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0}
          ListHeaderComponent={
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: "#524571",
                  textAlign: "center",
                  fontSize: 54,
                  padding: 0,
                  fontWeight: "bold",
                  paddingVertical: 20,
                }}
              >
                Mis viajes
              </Text>
              {!loadingPage && (
                <Text
                  style={{ marginBottom: 20, fontWeight: "bold", fontSize: 20 }}
                >
                  Cant. total de viajes cargados:{" "}
                  <Text style={{ fontWeight: 400 }}>
                    {cantTotalViajes.current}
                  </Text>
                </Text>
              )}
            </View>
          }
          ListFooterComponent={
            loadingItems && (
              <ActivityIndicator size={32} style={{ marginBottom: 10 }} />
            )
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MisViajes;

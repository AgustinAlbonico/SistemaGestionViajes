import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const ViajeItem = ({ viaje }) => {
  const { fecha_viaje, patente, movimiento, origen, destino, nro_viaje } =
    viaje.item;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.text_container}>
        <View style={styles.column}>
          <Text style={styles.column_item}>
            Fecha:{" "}
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              {moment(fecha_viaje).format("DD-MM-YYYY")}
            </Text>
          </Text>
          <Text style={styles.column_item}>
            Patente: <Text style={{ fontWeight: "400", fontSize: 16 }}>{patente}</Text>
          </Text>
          <Text style={styles.column_item}>
            Movimiento: <Text style={{ fontWeight: "400", fontSize: 16 }}>{movimiento}</Text>
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.column_item}>
            Origen: <Text style={{ fontWeight: "400", fontSize: 16 }}>{origen}</Text>
          </Text>
          <Text style={styles.column_item}>
            Destino: <Text style={{ fontWeight: "400", fontSize: 16 }}>{destino}</Text>
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Pressable
          style={({ pressed }) => [
            styles.edit_button,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => navigation.navigate("Editar viaje", { nro_viaje })}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 32 32"
          >
            <Path d="m0 32 12-4L32 8l-8-8L4 20zm4-4 2.016-5.984 4 4zm4-8L20 8l4 4-12 12z" fill="#E8EAED"/>
          </Svg>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8EAED",
    padding: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  text_container: { flexDirection: "row", gap: 12, justifyContent:"space-between", width:"85%" },
  column: { justifyContent: "center"},
  column_item: { display: "flex", fontSize: 18, fontWeight: "bold" },
  edit_button: {
    justifyContent: "center",
    backgroundColor: "#524571",
    padding: 6,
    borderRadius: 10,
    height: "auto",
  },
});

export default ViajeItem;

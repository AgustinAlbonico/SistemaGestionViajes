import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CheckBox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showErrorToast, showSuccessToast } from "../utils/toastFunctions";
import axios from "axios";
import { API_URL } from "../context/AuthContextProvider";
import { fetchUserInfo } from "../utils/fetchUserInfo";
import moment from "moment";

const NuevoViaje = ({ navigation }) => {
  //Datos del viaje
  const [date, setDate] = useState(() => {
    // const fechaActual = new Date();
    // fechaActual.setHours(fechaActual.getHours() - 3);
    // return fechaActual;
    return moment.utc().toDate()
  });
  const [showDateModal, setShowDateModal] = useState(false);

  const [movimiento, setMovimiento] = useState("");
  const [movimientoError, setMovimientoError] = useState("");

  const [patente, setPatente] = useState("");
  const [patenteError, setPatenteError] = useState("");

  const [modelo, setModelo] = useState("");
  const [modeloError, setModeloError] = useState("");

  const [marca, setMarca] = useState("");
  const [marcaError, setMarcaError] = useState("");

  const [cantKms, setCantKms] = useState("");
  const [cantKmsError, setCantKmsError] = useState("");

  const [observaciones, setObservaciones] = useState("");

  const [excedente, setExcedente] = useState("");

  const [particular, setParticular] = useState(false);

  const [origen, setOrigen] = useState("");
  const [origenError, setOrigenError] = useState("");

  const [destino, setDestino] = useState("");
  const [destinoError, setDestinoError] = useState("");

  const [loading, setLoading] = useState(false);

  const [metodosPago, setMetodosPago] = useState({
    efectivo: "0",
    transferencia: "0",
    otros: "0",
  });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    if (movimiento.length === 0) setMovimientoError("Movimiento vacio");
    else setMovimientoError("");
    if (patente.length === 0) setPatenteError("Patente vacia");
    else setPatenteError("");
    if (modelo.length === 0) setModeloError("Modelo vacio");
    else setModeloError("");
    if (marca.length === 0) setMarcaError("Marca vacia");
    else setMarcaError("");
    if (cantKms.length === 0)
      setCantKmsError("La cant. de kms. no puede ser 0");
    else setCantKmsError("");
    if (movimiento.length === 0) setMovimientoError("Movimiento vacio");
    else setMovimientoError("");
    if (origen.length === 0) setOrigenError("Origen vacio");
    else setOrigenError("");
    if (destino.length === 0) setDestinoError("Destino vacio");
    else setDestinoError("");

    const metodoPagoIds = {
      efectivo: 1,
      transferencia: 2,
      otros: 3,
    };

    // Convierte el estado de método de pago en un array de objetos
    const metodoPagoArray = Object.entries(metodosPago).map(([metodo]) => ({
      id_metodoPago: metodoPagoIds[metodo],
      importe:
        metodosPago[metodo].length === 0 ? 0 : parseFloat(metodosPago[metodo]),
    }));

    const finalObject = {
      fecha_viaje: moment(date).utc().utcOffset(-180).format("DD/MM/YYYY"),
      movimiento,
      patente,
      marca,
      modelo,
      cantKms: Number(cantKms),
      excedente: Number(excedente),
      metodosPago: metodoPagoArray,
      observaciones,
      particular,
      origen,
      destino,
    };

    if (
      modeloError.length === 0 &&
      marcaError.length === 0 &&
      patenteError.length === 0 &&
      Number(cantKms) !== 0 &&
      marcaError.length === 0 &&
      movimientoError.length === 0 &&
      origenError.length === 0 &&
      destinoError.length === 0
    ) {
      try {

        setLoading(true);

        const res = await axios.post(`${API_URL}/viaje`, finalObject);

        if (res.data.success) {
          showSuccessToast("Viaje guardado con exito");

          navigation.goBack();
        }
      } catch (error) {
        showErrorToast(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDateChange = (selectedDate) => {
    console.log(selectedDate)
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDateModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
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
            Nuevo viaje
          </Text>
          <View
            style={[
              styles.input_container,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                textAlign: "left",
                marginTop: 10,
              },
            ]}
          >
            <Text style={styles.label}>Es viaje particular?</Text>
            <CheckBox
              disabled={false}
              value={particular}
              onValueChange={(value) => {
                setParticular(value);
              }}
              style={{ width: 30, height: 30 }}
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Fecha del viaje:</Text>
            <Pressable
              style={[
                styles.input,
                { paddingVertical: 15 },
                showDateModal && { opacity: 0.6 },
              ]}
              onPress={() => {
                setShowDateModal(true);
              }}
            >
              <Text>{date.toLocaleDateString()}</Text>
              <DateTimePickerModal
                mode="date"
                display="default"
                date={date}
                isVisible={showDateModal}
                onConfirm={handleDateChange}
                onCancel={() => setShowDateModal(false)}
              />
            </Pressable>
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Movimiento:</Text>
            <TextInput
              placeholder="Movimiento"
              style={styles.input}
              value={movimiento}
              onChangeText={(text) => setMovimiento(text)}
            />
            {movimientoError.length > 0 && (
              <Text style={styles.error}>{movimientoError}</Text>
            )}
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Patente(ABC123 - AB123CD):</Text>
            <TextInput
              placeholder="Patente"
              style={styles.input}
              value={patente}
              onChangeText={(text) => setPatente(text)}
              autoCapitalize="characters"
            />
            {patenteError.length > 0 && (
              <Text style={styles.error}>{patenteError}</Text>
            )}
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Modelo:</Text>
            <TextInput
              placeholder="Modelo"
              style={styles.input}
              value={modelo}
              onChangeText={(text) => setModelo(text)}
            />
            {modeloError.length > 0 && (
              <Text style={styles.error}>{modeloError}</Text>
            )}
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Marca:</Text>
            <TextInput
              placeholder="Marca"
              style={styles.input}
              value={marca}
              onChangeText={(text) => setMarca(text)}
            />
            {marcaError.length > 0 && (
              <Text style={styles.error}>{marcaError}</Text>
            )}
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Cantidad de kilometros:</Text>
            <TextInput
              placeholder="Cant. Kms"
              style={styles.input}
              value={cantKms}
              onChangeText={(text) => setCantKms(text)}
              keyboardType="number-pad"
            />
            {cantKmsError.length > 0 && (
              <Text style={styles.error}>{cantKmsError}</Text>
            )}
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Excedente:</Text>
            <TextInput
              placeholder="Excedente"
              style={styles.input}
              value={excedente}
              onChangeText={(text) => setExcedente(text)}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Metodos de pago:</Text>
            <View style={styles.field_metodoPago}>
              <Text
                style={[styles.label, { fontWeight: "bold", width: "50%" }]}
              >
                Efectivo
              </Text>
              <View
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Efectivo"
                  style={[styles.input, { width: "100%" }]}
                  value={metodosPago.efectivo}
                  defaultValue={metodosPago.efectivo}
                  onChangeText={(importe) => {
                    setMetodosPago({
                      ...metodosPago,
                      efectivo: importe,
                    });
                  }}
                  keyboardType="number-pad"
                />
                <View
                  style={{ position: "absolute", right: 0, paddingRight: 16 }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>$</Text>
                </View>
              </View>
            </View>
            <View style={[styles.field_metodoPago]}>
              <Text
                style={[styles.label, { fontWeight: "bold", width: "50%" }]}
              >
                Transferencia
              </Text>
              <View
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Transferencia"
                  style={[styles.input, { width: "100%" }]}
                  value={metodosPago.transferencia}
                  defaultValue={metodosPago.transferencia}
                  onChangeText={(importe) => {
                    setMetodosPago({
                      ...metodosPago,
                      transferencia: importe,
                    });
                  }}
                  keyboardType="number-pad"
                />
                <View
                  style={{ position: "absolute", right: 0, paddingRight: 16 }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>$</Text>
                </View>
              </View>
            </View>
            <View style={styles.field_metodoPago}>
              <Text
                style={[styles.label, { fontWeight: "bold", width: "50%" }]}
              >
                Otros
              </Text>
              <View
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Otros"
                  style={[styles.input, { width: "100%" }]}
                  value={metodosPago.otros}
                  defaultValue={metodosPago.otros}
                  onChangeText={(importe) => {
                    setMetodosPago({
                      ...metodosPago,
                      otros: importe,
                    });
                  }}
                  keyboardType="number-pad"
                />
                <View
                  style={{ position: "absolute", right: 0, paddingRight: 16 }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>$</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.input_container}>
            <Text style={styles.label}>Observaciones:</Text>
            <TextInput
              placeholder="Observaciones"
              style={styles.input}
              value={observaciones}
              onChangeText={(text) => {
                setObservaciones(text);
              }}
            />
          </View>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.input_container}>
              <Text style={styles.label}>Origen:</Text>
              <TextInput
                placeholder="Origen"
                style={styles.input}
                value={origen}
                onChangeText={(text) => setOrigen(text)}
              />
              {origenError.length > 0 && (
                <Text style={styles.error}>{origenError}</Text>
              )}
            </View>

            <View style={styles.input_container}>
              <Text style={styles.label}>Destino:</Text>
              <TextInput
                placeholder="Destino"
                style={styles.input}
                value={destino}
                onChangeText={(text) => {
                  setDestino(text);
                }}
              />
              {destinoError.length > 0 && (
                <Text style={styles.error}>{destinoError}</Text>
              )}
            </View>
          </View>

          <Pressable
            style={{
              backgroundColor: "#524571",
              borderRadius: 8,
              width: "70%",
              display: "flex",
              padding: 20,
              marginVertical: 20,
            }}
            onPress={handleSubmit}
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
                Guardar
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input_container: {
    width: "80%",
    marginBottom: 10,
  },
  field_metodoPago: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  error: {
    color: "red",
  },
});

export default NuevoViaje;

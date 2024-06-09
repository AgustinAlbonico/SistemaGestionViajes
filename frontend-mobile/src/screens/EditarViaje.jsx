import {
  Text,
  View,
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native'
import CheckBox from 'expo-checkbox'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useRoute, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContextProvider'
import { showErrorToast, showSuccessToast } from '../utils/toastFunctions'
import moment from 'moment'
import { fetchUserInfo } from '../utils/fetchUserInfo'

const EditarViaje = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const nro_viaje = route.params.nro_viaje

  const [loading, setLoading] = useState(false)

  //Datos del viaje
  const [date, setDate] = useState(new Date())
  const [showDateModal, setShowDateModal] = useState(false)

  const [movimiento, setMovimiento] = useState('')
  const [movimientoError, setMovimientoError] = useState('')

  const [patente, setPatente] = useState('')
  const [patenteError, setPatenteError] = useState('')

  const [modelo, setModelo] = useState('')
  const [modeloError, setModeloError] = useState('')

  const [marca, setMarca] = useState('')
  const [marcaError, setMarcaError] = useState('')

  const [cantKms, setCantKms] = useState('')
  const [cantKmsError, setCantKmsError] = useState('')

  const [observaciones, setObservaciones] = useState('')

  const [excedente, setExcedente] = useState('')

  const [particular, setParticular] = useState(false)

  const [origen, setOrigen] = useState('')
  const [origenError, setOrigenError] = useState('')

  const [destino, setDestino] = useState('')
  const [destinoError, setDestinoError] = useState('')

  const [efectivo, setEfectivo] = useState('')
  const [transferencia, setTransferencia] = useState('')
  const [otros, setOtros] = useState('')

  const handleSubmit = async (e) => {
    if (movimiento.length === 0) setMovimientoError('Movimiento vacio')
    else setMovimientoError('')
    if (patente.length === 0) setPatenteError('Patente vacia')
    else setPatenteError('')
    if (modelo.length === 0) setModeloError('Modelo vacio')
    else setModeloError('')
    if (marca.length === 0) setMarcaError('Marca vacia')
    else setMarcaError('')
    if (cantKms.length === 0) setCantKmsError('La cant. de kms. no puede ser 0')
    else setCantKmsError('')
    if (movimiento.length === 0) setMovimientoError('Movimiento vacio')
    else setMovimientoError('')
    if (origen.length === 0) setOrigenError('Origen vacio')
    else setOrigenError('')
    if (destino.length === 0) setDestinoError('Destino vacio')
    else setDestinoError('')

    const metodoPagoArray = [
      {
        id_metodoPago: 1,
        importe: efectivo.length === 0 ? 0 : parseFloat(efectivo),
      },
      {
        id_metodoPago: 2,
        importe: transferencia.length === 0 ? 0 : parseFloat(transferencia),
      },
      {
        id_metodoPago: 3,
        importe: otros.length === 0 ? 0 : parseFloat(otros),
      },
    ]

    const finalObject = {
      fecha_viaje: moment.utc(date).format('DD/MM/YYYY'),
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
    }

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
        setLoading(true)

        const res = await axios.put(`${API_URL}/viaje/${nro_viaje}`, finalObject)

        if (res.data.success) {
          showSuccessToast('Viaje modificado con exito')

          navigation.goBack()
        }
      } catch (error) {
        showErrorToast(error.response.data.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDateChange = (selectedDate) => {
    if (selectedDate) setDate(selectedDate)
    setShowDateModal(false)
  }

  useEffect(() => {
    fetchUserInfo()
    const getViaje = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_URL}/viaje/${nro_viaje}`)
        let viaje = res.data
        setEfectivo(viaje.viaje_metodopago[0].importe.toString())
        setTransferencia(viaje.viaje_metodopago[1].importe.toString())
        setOtros(viaje.viaje_metodopago[2].importe.toString())
        setDate(moment.utc(viaje.fecha_viaje).add(3, 'hours').toDate()) //Jode la zona horaria
        setMovimiento(viaje.movimiento)
        setPatente(viaje.patente)
        setModelo(viaje.modelo)
        setMarca(viaje.marca)
        setCantKms(viaje.cantKms.toString())
        setExcedente(viaje.excedente.toString())
        setOrigen(viaje.origen)
        setDestino(viaje.destino)
        if (viaje.particular === 0) setParticular(false)
        else setParticular(true)
      } catch (error) {
        showErrorToast('Error al cargar el viaje')
        navigation.goBack()
      } finally {
        setLoading(false)
      }
    }
    getViaje()
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={42} />
      ) : (
        <ScrollView style={{ width: '100%' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: '#524571',
                textAlign: 'center',
                fontSize: 54,
                padding: 0,
                fontWeight: 'bold',
                paddingVertical: 20,
              }}
            >
              Nuevo viaje
            </Text>
            <View
              style={[
                styles.input_container,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  marginTop: 10,
                },
              ]}
            >
              <Text style={styles.label}>Es viaje particular?</Text>
              <CheckBox
                disabled={false}
                value={particular}
                onValueChange={(value) => {
                  setParticular(value)
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
                  setShowDateModal(true)
                }}
              >
                <Text>{date.toLocaleDateString()}</Text>
                <DateTimePickerModal
                  mode='date'
                  display='default'
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
                placeholder='Movimiento'
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
                placeholder='Patente'
                style={styles.input}
                value={patente}
                onChangeText={(text) => setPatente(text)}
                autoCapitalize='characters'
              />
              {patenteError.length > 0 && (
                <Text style={styles.error}>{patenteError}</Text>
              )}
            </View>
            <View style={styles.input_container}>
              <Text style={styles.label}>Modelo:</Text>
              <TextInput
                placeholder='Modelo'
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
                placeholder='Marca'
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
                placeholder='Cant. Kms'
                style={styles.input}
                value={cantKms}
                onChangeText={(text) => setCantKms(text)}
                keyboardType='number-pad'
              />
              {cantKmsError.length > 0 && (
                <Text style={styles.error}>{cantKmsError}</Text>
              )}
            </View>
            <View style={styles.input_container}>
              <Text style={styles.label}>Excedente:</Text>
              <TextInput
                placeholder='Excedente'
                style={styles.input}
                value={excedente}
                onChangeText={(text) => setExcedente(text)}
                keyboardType='number-pad'
              />
            </View>
            <View style={styles.input_container}>
              <Text style={styles.label}>Metodos de pago:</Text>
              <View style={styles.field_metodoPago}>
                <Text
                  style={[styles.label, { fontWeight: 'bold', width: '50%' }]}
                >
                  Efectivo
                </Text>
                <View
                  style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    placeholder='Efectivo'
                    style={[styles.input, { width: '100%' }]}
                    value={efectivo}
                    defaultValue={efectivo}
                    onChangeText={(importe) => {
                      setEfectivo(importe)
                    }}
                    keyboardType='number-pad'
                  />
                  <View
                    style={{ position: 'absolute', right: 0, paddingRight: 16 }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>$</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.field_metodoPago]}>
                <Text
                  style={[styles.label, { fontWeight: 'bold', width: '50%' }]}
                >
                  Transferencia
                </Text>
                <View
                  style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    placeholder='Transferencia'
                    style={[styles.input, { width: '100%' }]}
                    value={transferencia}
                    defaultValue={transferencia}
                    onChangeText={(importe) => {
                      setTransferencia(importe)
                    }}
                    keyboardType='number-pad'
                  />
                  <View
                    style={{ position: 'absolute', right: 0, paddingRight: 16 }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>$</Text>
                  </View>
                </View>
              </View>
              <View style={styles.field_metodoPago}>
                <Text
                  style={[styles.label, { fontWeight: 'bold', width: '50%' }]}
                >
                  Otros
                </Text>
                <View
                  style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    placeholder='Otros'
                    style={[styles.input, { width: '100%' }]}
                    value={otros}
                    defaultValue={otros}
                    onChangeText={(importe) => {
                      setOtros(importe)
                    }}
                    keyboardType='number-pad'
                  />
                  <View
                    style={{ position: 'absolute', right: 0, paddingRight: 16 }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>$</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.input_container}>
              <Text style={styles.label}>Observaciones:</Text>
              <TextInput
                placeholder='Observaciones'
                style={styles.input}
                value={observaciones}
                onChangeText={(text) => {
                  setObservaciones(text)
                }}
              />
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.input_container}>
                <Text style={styles.label}>Origen:</Text>
                <TextInput
                  placeholder='Origen'
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
                  placeholder='Destino'
                  style={styles.input}
                  value={destino}
                  onChangeText={(text) => {
                    setDestino(text)
                  }}
                />
                {destinoError.length > 0 && (
                  <Text style={styles.error}>{destinoError}</Text>
                )}
              </View>
            </View>

            <Pressable
              style={{
                backgroundColor: '#524571',
                borderRadius: 8,
                width: '70%',
                display: 'flex',
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
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'white',
                  }}
                >
                  Guardar
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_container: {
    width: '80%',
    marginBottom: 10,
  },
  field_metodoPago: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  error: {
    color: 'red',
  },
})

export default EditarViaje

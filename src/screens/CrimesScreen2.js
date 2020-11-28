import React, { useEffect, useRef, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { UserContext } from "../communication/UserContext";
import { baseURL } from "../constants/utils";

import Card from "../components/Card";
import Map from "../components/Map2";
import IconButton from "../components/IconButton";
import Input from "../components/Input";

const CRIMES = [
  {
    label: "Actividad sospechosa",
    value: "Actividad sospechosa",
  },
  {
    label: "Violencia",
    value: "Violencia",
  },
  {
    label: "Asalto",
    value: "Asalto",
  },
  {
    label: "Acoso",
    value: "Acoso",
  },
];

export default function CrimeScreen(props) {
  const [getGlobalUser, setGlobalUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const [emergencyPending, setEmergencyPending] = useState(false);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [reporting, setReporting] = useState(false);
  const [crimeDetails, setCrimeDetails] = useState(null);
  const [GPSLocation, setGPSLocation] = useState(null);
  let mapRef = useRef(null);
  const [location, setLocation] = useState({
    latitude: 9.868443,
    longitude: -83.927797,
  });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    getAlerts();
  }, []);

  const changeCategory = (val) => {
    if (val) {
      setCategory(val);
    }
  };

  const updateGPS = async () => {
    setLoading(true);
    let { status } = await Location.requestPermissionsAsync();
    let tmpLocation = await Location.getCurrentPositionAsync({});
    tmpLocation = {
      latitude: tmpLocation.coords.latitude,
      longitude: tmpLocation.coords.longitude,
    };
    console.log(tmpLocation);
    setLocation(tmpLocation);
    setGPSLocation(tmpLocation);
    moveCameraTo(tmpLocation);
    setLoading(false);
  };

  const getAlerts = async () => {
    setLoading(true);
    try {
      const user = await getGlobalUser();
      let response = await fetch(baseURL + "/alerts", {
        headers: { uid: user.uid },
      });
      let responseJson = await response.json();

      setAlerts(responseJson);

      if (user.emergencias.length !== 0) {
        setEmergencyPending(true);
      }
      setEmergency(null);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const moveCameraTo = (location) => {
    mapRef.current.animateCamera(
      {
        center: location,
        zoom: 15,
      },
      1
    );
  };

  const getDate = (date) => {
    const customDate = new Date(date);
    return customDate.toString();
  };

  const sendReport = async () => {
    setLoading(true);
    if (!category) {
      Alert.alert("Debe al menos seleccionar una categoría");
      return;
    }

    const user = await getGlobalUser();
    await fetch(baseURL + "/alerts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        uid: user.uid,
      },
      body: JSON.stringify({
        category: category,
        description: description,
        coords: location,
        hourDate: new Date().toISOString(),
      }),
    });

    Alert.alert("¡Muchas gracias por su colaboración!");
    setDescription("");
    setCategory("");
    setReporting(false);
    setLoading(false);
  };

  const getEmergencies = async () => {
    setLoading(true);
    const user = await getGlobalUser(true);
    setEmergency(user.emergencias);
    setAlerts(null);
    setLoading(false);
  };

  let emergencyMarkers = emergency
    ? emergency.map((el) => (
        <Marker
          key={el.name + el.date}
          coordinate={el.location}
          title={el.name}
          description={el.date}
        >
          <FontAwesome name="ambulance" size={40} color="red" />
        </Marker>
      ))
    : null;

  let alertMarkers = null;
  if (!reporting && alerts) {
    alertMarkers = alerts.map((el, i) => {
      let icon = null;
      switch (el.category) {
        case "Actividad sospechosa":
          icon = <FontAwesome name="warning" size={24} color="black" />;
          break;
        case "Violencia":
          icon = <FontAwesome5 name="fist-raised" size={24} color="black" />;
          break;
        case "Acoso":
          icon = (
            <MaterialCommunityIcons name="kabaddi" size={24} color="black" />
          );
          break;
        case "Asalto":
          icon = (
            <MaterialCommunityIcons name="pistol" size={24} color="black" />
          );
          break;

        default:
          icon = <FontAwesome name="warning" size={24} color="black" />;
          break;
      }
      return (
        <Marker
          key={i}
          coordinate={el.coords}
          title={el.category}
          onPress={() => setCrimeDetails(el)}
        >
          {icon}
        </Marker>
      );
    });
  }

  let GPSMarker = GPSLocation ? (
    <Marker coordinate={GPSLocation} title="GPS">
      <MaterialIcons name="gps-fixed" size={24} color="black" />
    </Marker>
  ) : null;

  let detailsView = crimeDetails ? (
    <View style={styles.bottomView}>
      <Card>
        <ScrollView>
          <Text>
            Localización: {crimeDetails.coords.latitude}{" "}
            {crimeDetails.coords.latitude}
          </Text>
          <Text>Categoría: {crimeDetails.category}</Text>
          <Text>Descripción: {crimeDetails.description}</Text>
          <Text>Fecha: {getDate(crimeDetails.hourDate)}</Text>
        </ScrollView>
      </Card>
    </View>
  ) : null;

  let inputView = reporting ? (
    <View style={styles.bottomView}>
      <Card>
        <ScrollView>
          <Picker selectedValue={category} onValueChange={changeCategory}>
            <Picker.Item label="Seleccione un delito" />
            {CRIMES.map((opt) => (
              <Picker.Item
                key={opt.value}
                label={opt.label}
                value={opt.value}
              />
            ))}
          </Picker>
          <Input
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Descripción (opcional)"
          ></Input>
          <View style={{ flexDirection: "row" }}>
            <IconButton clicked={() => setReporting(false)}>
              <FontAwesome name="remove" size={24} color="white" />
            </IconButton>
            <IconButton clicked={sendReport}>
              <FontAwesome name="check" size={24} color="white" />
            </IconButton>
          </View>
        </ScrollView>
      </Card>
    </View>
  ) : null;

  let reportMarker = reporting ? (
    <Marker coordinate={location} title="GPS">
      <FontAwesome name="warning" size={32} color="purple" />
    </Marker>
  ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        {loading ? (
          <ActivityIndicator color="purple" size="small"></ActivityIndicator>
        ) : null}
        <IconButton clicked={updateGPS}>
          <MaterialIcons name="gps-fixed" size={24} color="white" />
        </IconButton>
        <IconButton
          clicked={() => {
            setCrimeDetails(null);
            setReporting(true);
          }}
        >
          <FontAwesome name="bullhorn" size={24} color="white" />
        </IconButton>
        <IconButton clicked={getEmergencies}>
          <FontAwesome
            name="ambulance"
            size={24}
            color={emergencyPending ? "red" : "white"}
          />
        </IconButton>
        <IconButton clicked={getAlerts}>
          <FontAwesome name="warning" size={24} color="white" />
        </IconButton>
      </View>
      {detailsView}
      {inputView}
      <View style={{ flex: 1, zIndex: 0 }}>
        <MapView
          onPress={
            reporting
              ? (event) => setLocation(event.nativeEvent.coordinate)
              : () => setCrimeDetails(null)
          }
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 9.868443,
            longitude: -83.927797,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {emergencyMarkers}
          {reportMarker}
          {GPSMarker}
          {alertMarkers}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    width: "20%",
    height: "40%",
    position: "absolute",
    right: 0,
    top: "10%",
    zIndex: 100,
  },
  bottomView: {
    width: "90%",
    position: "absolute",
    right: "5%",
    bottom: "2%",
    zIndex: 100,
  },
});

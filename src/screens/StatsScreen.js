import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Text,
} from "react-native";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { baseURL } from "../constants/utils";

import Title from "../components/Title";
import Map from "../components/Map";
import InfoArea from "../components/InfoArea";
import IconButton from "../components/IconButton";
import InputArea from "../components/InputArea";
import Card from "../components/Card";

const ALERTS = [
  {
    category: "Actividad sospechosa",
    description: "s1",
    coords: {
      latitude: 9.868443,
      longitude: -83.927897,
    },
    hourDate: "2014-08-20 15:30:00",
  },
  {
    category: "Asalto",
    description: "s1",
    coords: {
      latitude: 9.869443,
      longitude: -83.927797,
    },
    hourDate: "2014-08-20 15:30:00",
  },
  {
    category: "Actividad sospechosa",
    description: "s1",
    coords: {
      latitude: 9.867443,
      longitude: -83.927697,
    },
    hourDate: "2014-08-20 15:30:00",
  },
];

const StatsScreen = () => {
  const [loadingGPS, setLoadingGPS] = useState(false);

  let map = useRef(null);
  const [crime, setCrime] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [geoInfo, setGeoInfo] = useState({ region: null, subregion: null });

  const [location, setLocation] = useState({
    latitude: 9.868443,
    longitude: -83.927797,
  });

  const updateLocation = async () => {
    setLoadingGPS(true);
    let { status } = await Location.requestPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert("No se puede acceder al GPS");
      setLoadingGPS(false);
      return;
    }
    let tmpLocation = await Location.getCurrentPositionAsync({});
    const finalLocation = {
      latitude: tmpLocation.coords.latitude,
      longitude: tmpLocation.coords.longitude,
    };
    moveCameraTo(finalLocation);
    setLocation(finalLocation);
    setLoadingGPS(false);
  };

  const moveCameraTo = (location) => {
    map.current.animateCamera(
      {
        center: location,
        zoom: 15,
      },
      1
    );
  };

  const moveObserver = async (location) => {
    setLocation(location);
    moveCameraTo(location);
    setCrime(null);
    const result = await Location.reverseGeocodeAsync(location);
    setGeoInfo(result[0]);
    console.log(geoInfo);
  };

  const getCrimesFromApi = async () => {
    try {
      let response = await fetch(baseURL + "/alerts");
      let alerts = await response.json();
      setAlerts(alerts);
    } catch (error) {
      console.error(error);
    }
  };

  let alertMarkers = null;

  if (alerts) {
    alertMarkers = alerts.map((el, i) => (
      <Marker
        key={i}
        coordinate={el.coords}
        onPress={() => setCrime(el)}
        title={el.category}
      >
        <FontAwesome name="warning" size={24} color="black" />
      </Marker>
    ));
  }

  return (
    <View style={{ flex: 1 }}>
      <Title>Estadísticas</Title>
      <ScrollView style={styles.container}>
        <Picker>
          <Picker.Item label="Último día" />
          <Picker.Item label="Última semana" />
          <Picker.Item label="Último mes" />
        </Picker>
        <View style={styles.buttonContainer}>
          <IconButton clicked={getCrimesFromApi}>
            <FontAwesome name="refresh" size={30} color="white" />
          </IconButton>
        </View>
        <Map changeLocation={moveObserver} location={location} mapRef={map}>
          {alertMarkers}
        </Map>
        <View style={styles.buttonContainer}>
          <IconButton disabled={loadingGPS} clicked={updateLocation}>
            {loadingGPS ? (
              <ActivityIndicator color="white"></ActivityIndicator>
            ) : (
              <MaterialIcons name="gps-fixed" size={24} color="white" />
            )}
          </IconButton>
          <IconButton clicked={() => moveObserver(location)}>
            <FontAwesome name="map-marker" size={24} color="white" />
          </IconButton>
        </View>
        {!crime ? (
          <Card>
            <Text>
              Referencia: {geoInfo.region}, {geoInfo.subregion}
            </Text>
          </Card>
        ) : (
          <InfoArea crime={crime}></InfoArea>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: { flex: 1, flexDirection: "row" },
});

export default StatsScreen;

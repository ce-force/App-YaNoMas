import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Marker } from "react-native-maps";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Title from "../components/Title";
import Map from "../components/Map";
import InfoArea from "../components/InfoArea";
import IconButton from "../components/IconButton";
import InputArea from "../components/InputArea";


const ALERTS = [
  {
    category: "Actividad sospechosa",
    description: "s1",
    coords: {
      latitude: 9.868443,
      longitude: -83.927897,
    },
  },
  {
    category: "Asalto",
    description: "s1",
    coords: {
      latitude: 9.869443,
      longitude: -83.927797,
    },
  },
  {
    category: "Actividad sospechosa",
    description: "s1",
    coords: {
      latitude: 9.867443,
      longitude: -83.927697,
    },
  },
];

const CRIMES = [
  {
    label: "Actividad sospechosa",
    value: "s1",
  },
  {
    label: "Violación",
    value: "v1",
  },
  {
    label: "Asalto",
    value: "a1",
  },
  {
    label: "Acoso",
    value: "a2",
  },
];

const CrimesScreen = () => {
  const [loadingGPS, setLoadingGPS] = useState(false);
  const [reporting, setReporting] = useState(false);

  let map = useRef(null);
  const [crime, setCrime] = useState(null);

  const [location, setLocation] = useState({
    latitude: 9.868443,
    longitude: -83.927797,
  });
  let [category, setCategory] = useState("");
  let [description, setDescription] = useState("");

  const updateLocation = async () => {
    setLoadingGPS(true);
    let { status } = await Location.requestPermissionsAsync();
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

  const moveObserver = (location) => {
    setLocation(location);
    setCrime(null);
  };

  const sendReport = () => {
    Alert.alert("¡Muchas gracias por su colaboración!");
    setDescription("");
    setCrime("");
    setReporting(false);
  };

  let alerts = reporting
    ? null
    : ALERTS.map((el, i) => (
        <Marker
          key={i}
          coordinate={el.coords}
          onPress={() => setCrime(el)}
          title={el.category}
        >
          <FontAwesome name="warning" size={24} color="black" />
        </Marker>
      ));

  return (
    <View style={{ flex: 1 }}>
      <Title>Eventos cercanos</Title>
      <ScrollView style={styles.container}>
        {reporting ? null : (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <IconButton clicked={() => moveCameraTo(location)}>
              <FontAwesome name="refresh" size={24} color="white" />
            </IconButton>
            <IconButton clicked={() => setReporting(true)}>
              <FontAwesome name="bullhorn" size={24} color="white" />
            </IconButton>
          </View>
        )}
        <Map changeLocation={moveObserver} location={location} mapRef={map}>
          {alerts}
        </Map>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <IconButton disabled={loadingGPS} clicked={updateLocation}>
            {loadingGPS ? (
              <ActivityIndicator color="white"></ActivityIndicator>
            ) : (
              <MaterialIcons name="gps-fixed" size={24} color="white" />
            )}
          </IconButton>
          <IconButton clicked={() => moveCameraTo(location)}>
            <FontAwesome name="map-marker" size={24} color="white" />
          </IconButton>
        </View>
        {reporting ? (
          <InputArea
            options={CRIMES}
            selected={category}
            description={description}
            handleChangeValue={(val) => {
              if (val) {
                setCategory(val);
              }
            }}
            handleChangeDescription={setDescription}
            location={location}
            finished={sendReport}
          ></InputArea>
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
});

export default CrimesScreen;

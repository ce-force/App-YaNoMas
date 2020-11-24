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
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Title from "./src/components/Title";
import Map from "./src/components/Map";
import InputArea from "./src/components/InputArea";
import IconButton from "./src/components/IconButton";

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

export default function App() {
  const [loadingGPS, setLoadingGPS] = useState(false);
  const [location, setLocation] = useState({
    latitude: 9.868443,
    longitude: -83.927797,
  });
  let [crime, setCrime] = useState("");
  let [description, setDescription] = useState("");
  let map = useRef(null);

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

  const sendReport = () => {
    Alert.alert("¡Muchas gracias por su colaboración!");
    setDescription("");
    setCrime("");
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

  return (
    <View style={{ flex: 1 }}>
      <Title>Reportar crimen</Title>
      <ScrollView style={styles.container}>
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
        <Map
          changeLocation={setLocation}
          location={location}
          mapRef={map}
        ></Map>
        <InputArea
          options={CRIMES}
          selected={crime}
          description={description}
          handleChangeValue={(val) => {
            if (val) {
              setCrime(val);
            }
          }}
          handleChangeDescription={setDescription}
          location={location}
        ></InputArea>
        <IconButton clicked={sendReport}>
          <FontAwesome name="check" size={24} color="white" />
        </IconButton>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import { AppLoading } from "expo";

import Title from "./src/components/Title";
import Map from "./src/components/Map";
import InputArea from "./src/components/InputArea";

export default function App() {
  const [location, setLocation] = useState({
    latitude: 9.868443,
    longitude: -83.927797,
  });
  let map = useRef(null);

  const updateLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    let location = await Location.getCurrentPositionAsync({});

    map.current.animateCamera(
      {
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        zoom: 16,
      },
      2000
    );
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const centerLocation = () => {
    map.current.animateCamera(
      {
        center: location,
        zoom: 16,
      },
      2000
    );
  };

  let [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Cargando fuentes...</Text>;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Title>Reportar crimen</Title>
        <ScrollView style={styles.container}>
          <Button title="Ir a mi ubicación" onPress={updateLocation}></Button>
          <Button title="Centrar" onPress={centerLocation}></Button>
          <Map
            changeLocation={setLocation}
            location={location}
            mapRef={map}
          ></Map>
          <InputArea location={location}></InputArea>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

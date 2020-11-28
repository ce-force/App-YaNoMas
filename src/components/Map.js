import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import customTheme from '../constants/Theme'

const Map = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        ref={props.mapRef}
        onPress={(event) => props.changeLocation(event.nativeEvent.coordinate)}
        initialRegion={{
          latitude: 9.943829,
          longitude: -84.118839,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        }}
        style={styles.mapStyle}
      >
        <Marker
          pinColor={customTheme.COLOR.ACTIVE}
          draggable
          title="Ubicación actual"
          coordinate={props.location}
          onDragEnd={(event) =>
            props.changeLocation(event.nativeEvent.coordinate)
          }
        >
          {props.reporting ? (
            <FontAwesome name="warning" size={30} color="#572364" />
          ) : (
            <FontAwesome name="map-marker" size={60} color="#572364" />
          )}
        </Marker>
        {props.children}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    margin: 4,
    elevation: 1,
    overflow: "hidden",
  },
  mapStyle: {
    width: "100%",
    height: 300,
  },
});

export default Map;

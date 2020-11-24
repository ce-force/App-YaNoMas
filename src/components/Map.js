import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const Map = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        ref={props.mapRef}
        onPress={(event) => props.changeLocation(event.nativeEvent.coordinate)}
        style={styles.mapStyle}
      >
        <Marker
          pinColor="#8E44B4"
          draggable
          title="Ubicación actual"
          description="Ubicación actual"
          coordinate={props.location}
          onDragEnd={(event) =>
            props.changeLocation(event.nativeEvent.coordinate)
          }
        ></Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    margin: 12,
    elevation: 1,
    overflow: "hidden",
  },
  mapStyle: {
    width: "100%",
    height: 300,
  },
});

export default Map;

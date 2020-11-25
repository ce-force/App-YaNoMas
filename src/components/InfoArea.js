import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";

const InfoArea = (props) => {
  return (
    <View style={styles.container}>
      {props.crime ? (
        [
          <Text>
            Localización: {props.crime.coords.latitude},
            {props.crime.coords.longitude}
          </Text>,
          <Text>Categoría: {props.crime.category}</Text>,
          <Text>Descripción: {props.crime.description}</Text>,
        ]
      ) : (
        <Text>Seleccione una alerta para ver detalles</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    margin: 4,
    elevation: 1,
    padding: 12,
    flexGrow: 1,
  },
});

export default InfoArea;

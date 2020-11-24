import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";

const InputView = (props) => {
  return (
    <View style={styles.container}>
      <Text>
        Location: {props.location.latitude},{props.location.longitude}
      </Text>
      <TextInput></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    margin: 12,
    elevation: 1,
    padding: 16,
    height: 300,
  },
});

export default InputView;

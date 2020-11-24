import React from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const InputView = (props) => {
  return (
    <View style={styles.container}>
      <Text>
        {props.location.latitude.toFixed(5)},
        {props.location.longitude.toFixed(5)}
      </Text>
      <Picker
        selectedValue={props.selected}
        onValueChange={props.handleChangeValue}
      >
        <Picker.Item label="Seleccione un delito" />
        {props.options.map((opt) => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>
      <TextInput
        value={props.description}
        onChangeText={props.handleChangeDescription}
        placeholder="Descripción (opcional)"
        style={styles.input}
      ></TextInput>
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
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 12,
  },
});

export default InputView;

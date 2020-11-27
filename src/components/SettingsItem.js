import React from "react";
import { View, StyleSheet } from "react-native";

export default function SettingsItem(props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    margin: 8,
    elevation: 1,
    padding: 8,
  },
});

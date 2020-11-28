import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native";

const IconButton = (props) => (
  <TouchableOpacity
    disabled={props.disabled}
    style={styles.container}
    onPress={props.clicked}
  >
    {props.children}
    {props.title ? <Text style={{ color: "white" }}>{props.title}</Text> : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#572364",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 4,
  },
});

export default IconButton;

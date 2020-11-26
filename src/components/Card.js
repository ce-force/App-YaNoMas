import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Card = (props) => <View style={styles.container}>{props.children}</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    margin: 4,
    elevation: 1,
    padding: 12,
  },
});

export default Card;

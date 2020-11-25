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

import InfoMapScreen from "./src/containers/InfoMapScreen";

export default function App() {
  return <InfoMapScreen></InfoMapScreen>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

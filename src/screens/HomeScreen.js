import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";
import currentTheme from "./../constants/Theme";
import { Block, Button, Text, theme } from "galio-framework";
import * as Location from "expo-location";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as firebase from "firebase";
import { UserContext } from "../communication/UserContext";
import { baseURL } from "../constants/utils";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function HomeScreen({ navigation }) {
  const [getGlobalUser, setGlobalUser] = useContext(UserContext);
  const [alertActive, setAlertActive] = useState(false);

  useEffect(() => {
    getGlobalUser(true);
    registerForPushNotificationsAsync();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    let tmpLocation = await Location.getCurrentPositionAsync({});
    tmpLocation = {
      latitude: tmpLocation.coords.latitude,
      longitude: tmpLocation.coords.longitude,
    };
    return tmpLocation;
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      let token = await Notifications.getExpoPushTokenAsync();

      // POST the token to your backend server from where you can retrieve it to send push notifications.
      const user = await getGlobalUser();

      updateExpoToken(token.data);

      console.log("$$$");
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpoToken = async (token) => {
    try {
      const user = await getGlobalUser();
      let response = await fetch(baseURL + "/users/" + user._id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          uid: user.uid,
        },
        body: JSON.stringify({ notificacionToken: token }),
      });
      let responseJson = await response.json();

      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmergency = async () => {
    try {
      console.log("-----------------EMERGENCY--------------------");
      const location = await getLocation();
      const date = new Date().toISOString();
      const user = await getGlobalUser();
      let response = await fetch(baseURL + "/users/emergency", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          uid: user.uid,
        },
        body: JSON.stringify({
          name: user.name,
          date: date,
          location: location,
        }),
      });
      console.log({
        name: user.name,
        date: date,
        location: location,
      });
      let responseJson = await response.json();

      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  const sendAlert = async () => {
    try {
      console.log("--------------------ALERTA-----------------");
      const location = await getLocation();
      const date = new Date().toISOString();
      const user = await getGlobalUser();
      let response = await fetch(baseURL + "/users/alert", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          uid: user.uid,
        },
        body: JSON.stringify({
          name: user.name,
          date: date,
          location: location,
        }),
      });
      let responseJson = await response.json();

      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
    setAlertActive(true);
  };

  const cancelAlert = async () => {
    try {
      const user = await getGlobalUser();
      let response = await fetch(baseURL + "/users/" + user._id, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          uid: user.uid,
        },
        body: JSON.stringify({ alerta: false }),
      });
      let responseJson = await response.json();

      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
    setAlertActive(false);
  };

  let alertButton = (
    <TouchableOpacity
      style={[styles.emergencytBtn, styles.alertBtn]}
      onPress={sendAlert}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Estado de Alerta</Text>
      <Text>(Se notificará a tu círculo)</Text>
    </TouchableOpacity>
  );

  if (alertActive) {
    alertButton = (
      <TouchableOpacity
        style={[styles.emergencytBtn, styles.cancelBtn]}
        onPress={cancelAlert}
      >
        <Text style={{ fontSize: 24 }}>Emergencia en 5min</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Desactivar alerta
        </Text>
        <Text style={{ fontSize: 24 }}>(Estado de Alerta activo)</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.emergencytBtn} onPress={sendEmergency}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Emergencia</Text>
        <Text>(Se notificará a tu círculo)</Text>
      </TouchableOpacity>
      {alertButton}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  alertBtn: {
    backgroundColor: "yellow",
  },
  cancelBtn: {
    backgroundColor: "grey",
  },
  emergencytBtn: {
    backgroundColor: "red",
    margin: 24,
    borderRadius: 16,
    elevation: 5,
    height: 240,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;

import React, {useState} from "react";
import { StyleSheet, View, SafeAreaView, Alert } from "react-native";
import currentTheme from "./../constants/Theme";
import { Block, Button, Text, theme } from "galio-framework";
import * as Location from "expo-location";

function HomeScreen({navigation}){

  const currentLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    let tmpLocation = await Location.getCurrentPositionAsync({});
  }

  const activateEmergencyState = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserMail: 'currentusername',
        location: 'location',
        state: 'EMERGENCY'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => alert(JSON.stringify(json)))
  } 

  const activateAlertState = () => {
    currentLocation();
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserMail: 'currentusername',
        location: 'location',
        state: 'ALERT'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => alert(JSON.stringify(json)))
  } 

    return (
        <View style={styles.container}>
          <View style={{ flex: 1, flexDirection: "row" }}>
              <Button style={styles.alertBtn} onPress={() => activateEmergencyState()}>Emergencia</Button>
              <Button style={styles.alertBtn} onPress={() => activateAlertState()}>Estado de Alerta</Button>
          </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    alertBtn:{
      backgroundColor: currentTheme.COLORS.DEFAULT
    }
    
  });

export default HomeScreen;

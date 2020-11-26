import React from "react";
import { StyleSheet, Text, View, SafeAreaView, PickerIOS } from "react-native";
import { Picker } from "@react-native-picker/picker";

import * as firebase from "firebase";

function HomeScreen() {
  /*var firebaseConfig = {
    apiKey: "AIzaSyChHW4ISX4IwTf5JtrICcWk69WePptA-FI",
    authDomain: "programathon-a64e7.firebaseapp.com",
    databaseURL: "https://programathon-a64e7.firebaseio.com",
    projectId: "programathon-a64e7",
    storageBucket: "programathon-a64e7.appspot.com",
    messagingSenderId: "369883803944",
    appId: "1:369883803944:web:dfafd94de159aeb73be01d",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase
    .database()
    .ref("/users/lol")
    .on("value", (snapshot) => {
      console.log(snapshot.val());
    });*/

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Picker>
        <Picker.Item label="Seleccione un delito" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default HomeScreen;

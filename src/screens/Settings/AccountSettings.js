import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { Block, Button, Text, theme } from "galio-framework";
import firebase from "firebase";


function AccountSettings(){
  const logOut = () => {
    firebase.auth().signOut().then(() => {
      //ToastAndroid.show("Cerrando Sesión...", ToastAndroid.SHORT);
  
      NavigationActions.navigate({
        routeName: 'Login',
        params: {},
      });
    }, (error) => { Alert.alert(error.message); });
  };

  const deleteAccount = (userId) => {
  
    return fetch('https://jsonplaceholder.typicode.com//posts/1' + userId, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(json => Alert.alert(JSON.stringify(json)))
      .then(logOut()); 
      
  }
  
    return (
        <View style={styles.container}>

            <Button onPress={() => deleteAccount("user")}>Eliminar Cuenta</Button>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    }
  });

export default AccountSettings;

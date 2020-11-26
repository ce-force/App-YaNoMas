import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

function CircleManagement(){
    return (
        <View style={styles.container}>

            <Text>Circle Management</Text>
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

export default CircleManagement;

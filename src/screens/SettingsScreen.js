import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function SettingsScreen(){
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
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

export default SettingsScreen;

import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

function PrivacySettings(){
    return (
        <View style={styles.container}>

            <Text>Privacy Screen</Text>
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

export default PrivacySettings;

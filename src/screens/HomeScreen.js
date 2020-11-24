import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function HomeScreen(){
    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
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

export default HomeScreen;

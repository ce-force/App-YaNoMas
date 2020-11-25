import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

function CircleScreen(){
    return (
        <View style={styles.container}>
            <Text>Circle Screen</Text>
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

export default CircleScreen;

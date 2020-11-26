import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Keyboard, SearchBar} from "react-native";
import currentTeme from "../constants/Theme";


function InformationScreen(){
    return (
      <View style={styles.container}>

      </View>
      
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    item: {
      height: 31,
      paddingLeft: 15,
      borderStyle: "solid",
      borderBottomColor: currentTeme.COLORS.GRAY
    },
    title: {
      fontSize: 16,
      paddingLeft: 10
    }
  });

export default InformationScreen;

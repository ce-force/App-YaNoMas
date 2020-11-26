import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import currentTeme from "../constants/Theme";

import { Card } from 'react-native-elements'


const customData = require('../../assets/MessageData.json');

function Item({ title, image, message }) {
  return (

    <View>
        <Card>
            <Card.Title>{title}</Card.Title>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>
                {message}
            </Text>
            <Card.Divider/>

            <Card.Image source={{ uri: image.toString(), width: 32, height: 32, }} />


        </Card>

    </View>

);

}

function InformationScreen(){
    return (
        <View style={styles.container}>
            <FlatList
              data={customData}
              renderItem={({ item }) => (
                <Item
                    title={item.title}
                    image={item.image}
                    message={item.message}/>
              )}
              keyExtractor={item => item.id}
            />
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

import React from "react";
import {StyleSheet, Text, View, SafeAreaView, FlatList, Image, ScrollView} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import currentTeme from "../constants/Theme";

import { Card } from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';

const customData = require('../../assets/MessageData.json');


function Item({ title, image, message }) {
  return (

    <View style={{marginBottom: 20}}>

        <Card style={{borderRadius: 8}}>
            <Card.Title>{title}</Card.Title>
            <Card.Divider/>
            <Text style={{marginBottom: 10}}>
                {message}
            </Text>
            <Card.Divider/>

            <Card.Image source={{ uri: image, width: 25, height: 25, }}/>

        </Card>

    </View>

);

}

function InformationScreen(){

    const [category, setCategory] = React.useState({
        type: 'java',
    });

    const categories = [
        {id: 0, type: "info", label: "Información relevante"},
        {id: 1, type: "reminder", label: "Recordatorios"},
        {id: 2, type: "contact", label: "Contacto"}
        ];


    function handleChange(value) {
        setCategory({type: value})
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={category.type}
                onValueChange={value => handleChange(value)}
                mode="dropdown"
                style={styles.picker}
                itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
                {categories.map(item => <Picker.Item key={item.id} label={item.label} value={item.type}/>)}
            </Picker>
            <ScrollView style={{ marginBottom: 50 }}>
            {customData.map(element => { return category.type === element.type ? (
                                        <Item key={element.id}
                                            title={element.title}
                                            image={element.image}
                                            message={element.message}/>)
                : (<View key={element.id}/>)})
            }

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      justifyContent: "center",
        alignItems: "center"
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
    },
    picker: {
        top: 5,
        width: 260,
        fontSize:10,
        borderRadius: 10
    }
  });

export default InformationScreen;

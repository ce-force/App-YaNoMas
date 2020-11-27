import React from "react";
import {StyleSheet, Text, View, SafeAreaView, FlatList, Image, ScrollView} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import currentTeme from "../constants/Theme";

import { Card } from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import {MessageItem} from "../components/MessageItem";

const customData = require('../../assets/MessageData.json');




function InformationScreen(){

    const [category, setCategory] = React.useState({
        type: 'info',
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
            <ScrollView style={{ marginBottom: 50, marginTop: 50}}>
            {customData.map(element => { return category.type === element.type ? (
                                        <MessageItem key={element.id}
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
        flex: 1,
        backgroundColor: currentTeme.COLORS.WHITE,
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
        top: 50,
        width: 260,
        fontSize:10,
        borderRadius: 10,
    }
  });

export default InformationScreen;

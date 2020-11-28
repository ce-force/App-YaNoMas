import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, SafeAreaView, FlatList, Image, ScrollView} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import currentTeme from "../constants/Theme";

import Card from "../components/Card";
import {Picker} from '@react-native-picker/picker';
import {MessageItem} from "../components/MessageItem";
import {baseURL} from "../constants/utils";




function InformationScreen(){


    const [customData, setCustomData] = useState([]);

    const [category, setCategory] = React.useState({
        type: 'info',
    });

    const categories = [
        {id: 0, type: "info", label: "Información relevante"},
        {id: 1, type: "reminder", label: "Recordatorios"},
        {id: 2, type: "contact", label: "Contacto"}
        ];


    // Fetch data from api
    useEffect(() => {
        fetch(baseURL + '/informations')
            .then((response) => response.json())
            .then((responseJson) => {
                setCustomData(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    function handleChange(value) {
        setCategory({type: value})
    }

    return (
        <View style={styles.container}>
            <Card>
            <Picker
                selectedValue={category.type}
                onValueChange={value => handleChange(value)}
                mode="dropdown"
                style={styles.picker}
                itemStyle={{ color:'red', fontWeight:'900', fontSize: 18, padding:30}}>
                {categories.map(item => <Picker.Item key={item.id} label={item.label} value={item.type}/>)}
            </Picker>
            </Card>
            <ScrollView style={{ marginBottom: 50, marginTop: 20, width: '100%'}}>
            {customData.map(element => { return category.type === element.type ? (
                                        <MessageItem key={element._id}
                                            title={element.title}
                                            image={element.image}
                                            message={element.message}/>)
                : (<View key={element._id}/>)})
            }

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 260,
        fontSize:20,
        color: currentTeme.COLORS.BLACK
    }
  });

export default InformationScreen;

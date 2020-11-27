import {Text, View} from "react-native";
import {Card} from "react-native-elements";
import React from "react";

import currentTeme from "../constants/Theme";
export function MessageItem({ title, image, message }) {
    return (

        <View>

            <Card style={{borderRadius: 8, marginTop: 50}}>
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

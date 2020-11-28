import {StyleSheet, Text, View, Image} from "react-native";
import React from "react";

import currentTeme from "../constants/Theme";
import Card from "../components/Card";
export function MessageItem({ title, image, message }) {
    return (

        <View>
            <Card>
                <Text style={styles.cardText}>
                    {message}
                </Text>
                <View style={styles.container}>
                <Image style={styles.imageStyle} source={{ uri: image, width: '90%', height: 200 }}/>
                </View>
            </Card>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center'
    },
    cardText: {
        fontSize: 15,
        padding: 20
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity, View
} from 'react-native';
import theme from "../constants/Theme";
import {color} from "react-native-reanimated";

export const LargeButton = ({ onPress, title }) => (
    <View style={styles.button}>

        <TouchableOpacity
            onPress={onPress}
            style={[styles.signIn, {
                borderColor: theme.COLORS.SECONDARY,
                borderWidth: 1,
                marginTop: 15
            }]}
        >
            <Text style={[styles.textSign, {
                color: theme.COLORS.SECONDARY
            }]}>{title}</Text>
        </TouchableOpacity>
    </View>
);


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});


import React, { useEffect } from 'react';
import Text from "react-native-paper/src/components/Typography/Text";
import Button from "react-native-paper/src/components/Button";
import firebase from "firebase";
require('firebase/auth');
import {Alert} from "react-native";

const Profile = ({navigation}) => {

    // Logs out the signed in user
    function signOut() {
        firebase.auth().signOut().then(() => {
            Alert.alert('Listo!', 'Has salido de sesión', [
                {text: 'Okay'}
            ]);

            navigation.navigate('Login');
        }, (error) => { Alert.alert(error.message); });
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
    }, [navigation]);

    return (
        <Button onPress={() => { signOut()} }><Text>Hola</Text></Button>
    );
};

export default Profile;

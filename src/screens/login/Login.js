import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import firebase from 'firebase';

import theme from '../../constants/Theme'
import {LargeButton} from "../../components/LargeButton";
import TabNavigator from "../../components/TabNavigator";
import {createAppContainer} from "react-navigation";


const Login = ({navigation}) => {

    // Variables
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    // If the user is already logged in, send him to profile screen
    const verifyLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                navigation.navigate('TabNavigator');
            }else{
                navigation.navigate('Login');
            }
        })
    };

    verifyLoggedIn();

    // Handle email input changes
    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    };

    // Handle password input changes
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    };

    // Entry is valid
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    // User is valid and longer than 4 characters
    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    };

    // User login with firebase authentication
    const loginHandle = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert('Listo!', 'Bienvenid@.', [
                {text: 'Okay'}
            ]);
                setData({
                    ...data,
                    email: '',
                    password: ''
                });
                navigation.navigate('TabNavigator');
                }, (error) => { Alert.alert(error.message); });
    };


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={theme.COLORS.BLACK} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Bienvenid@</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: theme.COLORS.WHITE
                }]}
            >

                <Text style={[styles.text_footer, {
                    color: theme.COLORS.BLACK
                }]}>Usuario</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color={theme.COLORS.SECONDARY}
                        size={20}
                    />
                    <TextInput
                        placeholder="Su usuario"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: theme.COLORS.BLACK
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                { data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>El usuario debe tener al menos 4 caracteres</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: theme.COLORS.BLACK,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={theme.COLORS.SECONDARY}
                        size={20}
                    />
                    <TextInput
                        placeholder="Su contraseña"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry}
                        style={[styles.textInput, {
                            color: theme.COLORS.BLACK
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                { data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }


                <TouchableOpacity>
                    <Text style={{color: theme.COLORS.SECONDARY, marginTop:15}}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => navigation.navigate('Register')}

                    ><Text style={{color: theme.COLORS.SECONDARY, marginTop:15}}>Crear una cuenta</Text>
                    </TouchableOpacity>

                    <LargeButton
                        onPress={() => {loginHandle( data.email, data.password )}}
                        title="Ingresar"/>
                </View>
            </Animatable.View>
        </View>
    );
};

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.SECONDARY
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 0
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: theme.COLORS.SECONDARY,
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.COLORS.ERROR,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: theme.COLORS.SECONDARY,
    },
    errorMsg: {
        color: theme.COLORS.ERROR,
        fontSize: 14,
    }
});

export default Login;

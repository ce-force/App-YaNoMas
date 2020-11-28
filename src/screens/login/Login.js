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

import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID
} from '../../../config/FirebaseConfig'
import {baseURL} from "../../constants/utils";


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
    if( val.trim().length >= 6 ) {
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
        .then((r) => {
          Alert.alert('Listo!', 'Bienvenid@.', [
            {text: 'Okay'}
          ]);
          // Post to MongoDB
          fetch(baseURL + "/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: r.user.email,
              uid: r.user.uid
            }),
          });
          navigation.navigate('TabNavigator');
        }, (error) => { Alert.alert(error.message); });
  };

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      let providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser)  => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    let unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        let credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result){
          // Post to MongoDB
          fetch(baseURL + "/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: result.user.email,
              uid: result.user.uid,
              name: result.user.displayName
            }),
          });
          firebase
              .database()
              .ref('/users'+result.user.uid)
              .set({
                gmail:result.user.email,
                name:result.user.name,
              })
              .then(function(snapshot){
              });
        }).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          let email = error.email;
          let credential = error.credential;
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        behavior: 'web',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        onSignIn(result);

        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
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
                color={theme.COLORS.DEFAULT}
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
                color={theme.COLORS.DEFAULT}
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
                <Text style={styles.errorMsg}>La contraseña debe tener al menos 6 caracteres.</Text>
              </Animatable.View>
          }


          <TouchableOpacity>
            <Text style={{color: theme.COLORS.DEFAULT, marginTop:15}}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
                style={styles.signIn}
                onPress={() => navigation.navigate('Register')}

            ><Text style={{color: theme.COLORS.DEFAULT, marginTop:15}}>Crear una cuenta</Text>
            </TouchableOpacity>

            <LargeButton
                onPress={() => {loginHandle( data.email, data.password )}}
                title="Ingresar"/>
            <TouchableOpacity
                style={{ width: "100%", marginTop: 10 }}
                onPress={() => signInWithGoogleAsync()}>
              <View style={styles.googleButton}>
                <Text
                    style={{
                      letterSpacing: 0.5,
                      fontSize: 16,
                      color: "#707070"
                    }}
                >
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT
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
    color: theme.COLORS.DEFAULT,
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
    color: theme.COLORS.DEFAULT,
  },
  errorMsg: {
    color: theme.COLORS.ERROR,
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    height: 44,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#707070"
  }
});

export default Login;

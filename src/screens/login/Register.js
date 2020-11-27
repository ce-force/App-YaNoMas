import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import theme from "../../constants/Theme";
import { LargeButton } from "../../components/LargeButton";
import firebase from "firebase";

import { baseURL } from "../../constants/utils";
const Register = ({ navigation }) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    name: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  // Handle name input change
  const nameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        name: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textInputChange: false,
      });
    }
  };

  // Handle email input change
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  // Handle password input change
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  // Entry is valid
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  // Sign in user with firebase auth
  function signInHandle(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (r) => {
          Alert.alert("Listo", "Su cuenta ha sido creada", [{ text: "Okay" }]);

          // Post to MongoDB
          fetch(baseURL + "/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: r.user.email,
              name: data.name,
              uid: r.user.uid,
            }),
          });
          navigation.navigate("Login");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.COLORS.DEFAULT}
        barStyle="light-content"
      />
      <View style={styles.header}>
        <Text style={styles.text_header}>¡Ingresar ahora!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>Nombre completo</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Nombre completo"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => nameInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Correo Electrónico
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Correo electrónico"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Contraseña
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Contraseña"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              Al registarse está de acuerdo con nuestros
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Términos y condiciones
            </Text>
            <Text style={styles.color_textPrivate}> y</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Politica de privacidad
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ color: theme.COLORS.DEFAULT, marginTop: 15 }}>
                Ya tengo una cuenta
              </Text>
            </TouchableOpacity>

            <LargeButton
              onPress={() => {
                signInHandle(data.email, data.password);
              }}
              title="Registrarse"
            />
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.DEFAULT,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: theme.COLORS.BLACK,
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: theme.COLORS.BLACK,
  },

  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
});

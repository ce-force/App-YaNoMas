import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Image,
  ImageBackground,
  Platform,
  FlatList,
  ToastAndroid,
  Alert
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import firebase from "firebase";
import { NavigationActions, StackActions } from 'react-navigation'

import currentTeme from "../constants/Theme";
import { HeaderHeight, AppVersion, TeamName } from "../constants/utils";
import Images from "../constants/Images";
const { width, height } = Dimensions.get("screen");
const thumbMeasure = (width - 48 - 32) / 3;


function SettingsScreen({navigation}){

  const GENERALSETTINGSDATA = [
    {
      id:"yanomas-v1.0.0-settings-notifications",
      title: "Notificaciones",
      icon: "bell"
    },
    {
      id:"yanomas-v1.0.0-settings-circlemanagement",
      title: "Manejo de Círculo",
      icon: "circle-slice-6"
    },
    {
      id:"yanomas-v1.0.0-settings-locationsharing",
      title: "Ubicación",
      icon: "share"
    }
  ]

  const UNIVERSALSETTINGSDATA = [
    {
      id:"yanomas-v1.0.0-settings-profile",
      title: "Cuenta",
      icon: "account"
    },
    {
      id:"yanomas-v1.0.0-settings-privacy",
      title: "Privacidad y Seguridad",
      icon: "key"
    },
    {
      id:"yanomas-v1.0.0-settings-support",
      title: "Soporte",
      icon: "information"
    },
    {
      id:"yanomas-v1.0.0-settings-logout",
      title: "Cerrar Sesión",
      icon: "logout"
    }
  ]

  function Item({ title, icon }) {
    return (
        <View style={styles.item}>
          <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
          >
            <View
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
            >
              <Icon
                  name={icon}
                  size={25}
                  color={currentTeme.COLORS.DEFAULT}
                  onPress = {() => navigate(icon)}
              />
              <Text style={styles.title} onPress = {() => navigate(icon)}>{title}</Text>
            </View>
          </View>
        </View>
    );
  }


  const showToast = (icon) => {
    ToastAndroid.show(icon, ToastAndroid.SHORT);
  };

  const logOut = () => {
    firebase.auth().signOut().then(() => {
      ToastAndroid.show("Cerrando Sesión...", ToastAndroid.SHORT);

      NavigationActions.navigate({
        routeName: 'Login',
        params: {},
      });
    }, (error) => { Alert.alert(error.message); });
  };


  const navigate = (icon_name) => {
    switch (icon_name) {
      case "bell":
        navigation.navigate("NotificationsSettings");
        break;
      case "circle-slice-6":
        navigation.navigate("CircleManagement");
        break;
      case "share":
        navigation.navigate("LocationSettings");
        break;
      case "account":
        navigation.navigate("AccountScreen");
        break;
      case "key":
        navigation.navigate("AccountScreen");
        break;
      case "information":
        showToast("PÁGINA DE SOPORTE");
        break;
      case "logout":
        logOut();
        break;
      default:
        break;
    }
  }



  return (
    <Block flex style={styles.profile}>
    <Block flex>
      <ImageBackground
        source={Images.ProfileBackground}
        style={styles.profileContainer}
        imageStyle={styles.profileBackground}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width, marginTop: '25%' }}
        >
          <Block flex style={styles.profileCard}>
            <Block middle style={styles.avatarContainer}>
              <Image
                source={{ uri: Images.ProfilePicture }}
                style={styles.avatar}
              />
            </Block>
            <Block flex>
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} style={{color: currentTeme.COLORS.TEXT}}>
                  Jane Doe, 20
                </Text>
                <Text size={16} style={{ marginTop: 10, color: currentTeme.COLORS.TEXT }}>
                  Cartago, COSTA RICA
                </Text>
              </Block>
              <Block middle style={{ marginTop: 10 }}>
                <Block />
              </Block>
            </Block>
            <Block style={styles.info}>
              <Block row space="between">
                <Block middle>
                  <Text
                    bold
                    size={18}
                    style={{ marginBottom: 4, color: currentTeme.COLORS.TEXT }}
                  >
                    10
                  </Text>
                  <Text size={12} color={theme.COLORS.TEXT}>En mí circulo</Text>
                </Block>
                <Block middle>
                  <Text
                    bold
                    size={18}
                    style={{ marginBottom: 4, color: currentTeme.COLORS.TEXT }}
                  >
                    10
                  </Text>
                  <Text size={12} color={theme.COLORS.TEXT}>En otros círculos</Text>
                </Block>

              </Block>

            </Block>


            <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
            </Block>

            <Text style={{ paddingLeft:15, marginBottom: 10, color: currentTeme.COLORS.TEXT}}>
              Configuraciones Generales
            </Text>

            <FlatList
              data={GENERALSETTINGSDATA}
              renderItem={({ item }) => (
                <Item
                  title={item.title}
                  icon={item.icon}
                />
              )}
              keyExtractor={item => item.id}
            />

            <Text style={{ marginTop:20,  paddingLeft:15, marginBottom: 10, color: currentTeme.COLORS.TEXT}}>
              Configuraciones Universales
            </Text>

            <FlatList
              data={UNIVERSALSETTINGSDATA}
              renderItem={({ item }) => (
                <Item
                  title={item.title}
                  icon={item.icon}
                />
              )}
              keyExtractor={item => item.id}
            />

            <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
                  <Text size={11} color={theme.COLORS.DEFAULT} >
                    {TeamName} - Versión {AppVersion}
                  </Text>
            </Block>


          </Block>
        </ScrollView>
      </ImageBackground>
    </Block>
  </Block>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    },
    profile: {
      marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
      flex: 1
    },
    profileContainer: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 1
    },
    profileBackground: {
      width: width,
      height: height / 2
    },
    profileCard: {
      padding: theme.SIZES.BASE,
      marginHorizontal: theme.SIZES.BASE,
      marginTop: 65,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      backgroundColor: currentTeme.COLORS.WHITE,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
      shadowOpacity: 0.2,
      zIndex: 2
    },
    info: {
      paddingHorizontal: 40
    },
    avatarContainer: {
      marginTop: 10,
      position: "relative",
    },
    avatar: {
      marginTop: 15,
      width: 124,
      height: 124,
      borderRadius: 62,
      borderWidth: 0
    },
    nameInfo: {
      marginTop: 10
    },
    divider: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#E9ECEF"
    },
    item: {
      height: 31,
      paddingLeft: 15,
      borderStyle: "solid",
      borderBottomColor: "gray"
    },
    title: {
      fontSize: 16,
      paddingLeft: 10
    }
  });


export default SettingsScreen;

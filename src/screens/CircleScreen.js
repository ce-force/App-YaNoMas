import React, {useState, useEffect}  from "react";
import { StyleSheet, View, SafeAreaView, Alert, Switch, FlatList, TextInput, TouchableOpacity, Image } from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import firebase from "firebase";
import currentTheme from './../constants/Theme';


function CircleScreen(){
  const [switchValues, setSwitchValue] = useState([]);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
  };

  const USERS = [
    {id:"001", title: "Usuario #1"},
    {id:"002", title: "Usuario #2"},
    {id:"003", title: "Usuario #3"}
  ]

  const [inputEmail, setText] = useState('');

  function ItemCircle({ id, title }) {
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
              <Text style={styles.title} >{title}</Text>
              <Button style={styles.addFriendButton} onPress={() => addToCircle("user")}>Añadir </Button>
            </View>
          </View>
        </View>
    );
  }


  function ItemRequests({ id, title }) {
    return (
        <View style={styles.item}>
          <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
          >
              <Text style={styles.title} >{title}</Text>
              <Button style={styles.addFriendButton} onPress={() => acceptFriendRequest({title})}>Aceptar solicitud</Button>
              <Button style={styles.addFriendButton} onPress={() => denyFriendRequest({title})}>Denegar solicitud</Button>
            </View>
        </View>
    );
  }


  function ItemFriend({ id, title }) {
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
              <Text style={styles.title} >{title}</Text>
              <Switch
                onValueChange={toggleSwitch}
                value={switchValues[0]}
              />              
              <Button style={styles.addFriendButton} onPress={() => deleteFriend({title})}>Eliminar</Button>
            </View>
          </View>
        </View>
    );
  }
  const deleteFriend = (userId) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserMail: userId,
        circleUserMail: '002',
        state: 'DELETE'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => Alert.alert(JSON.stringify(json)))
  }

  const acceptFriendRequest = (userId) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserMail: userId,
        circleUserMail: '002',
        state: 'ACCEPT'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => Alert.alert(JSON.stringify(json)))
  }

  const denyFriendRequest = (userId) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserMail: userId,
        circleUserMail: '002',
        state: 'DENY'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => Alert.alert(JSON.stringify(json)))
  }

  const addFriend = (userId) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserMail: userId,
        circleUserMail: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => alert(JSON.stringify(json)))
  }


    return (
        <View style={styles.container}>

          {/*<SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={(text) => searchFilterFunction(text)}
                underlineColorAndroid="transparent"
                placeholder="Search Here"/>
              <Button onPress={addFriend(text)}>Agregar</Button>
            </View>
          </SafeAreaView>*/}

          <Text>Añadir a mi circulo</Text>
      <SafeAreaView style={styles.container}>
        <View style={styles.parent}>
          <TextInput
            style={styles.textInputStyle}
            value={inputEmail}
            placeholder="Correo Electrónico"
            onChangeText={value => setText(value)}
          />
          <TouchableOpacity
            style={styles.closeButtonParent}
            onPress={() => addFriend(inputEmail)}>
            <Image
              style={styles.searchButton}
              source={require('./../../assets/imgs/search.png')}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

          


          <Text>Lista de Solicitudes</Text>
          

          <FlatList
              data={USERS}
              renderItem={({ item }) => (
                <ItemRequests
                  title={item.title, item.title}
                />
              )}
              keyExtractor={item => item.id}
            />

          <Text>Lista de mis amigos</Text>

          <FlatList
              data={USERS}
              renderItem={({ item }) => (
                
                <ItemFriend
                  title={item.title, item.title}
                />
              )}
              keyExtractor={item => item.id}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
    },
    divider: {
      width: "90%",
      borderWidth: 1,
      borderColor: "#E9ECEF"
    },
    item: {
      height: 50,
      paddingLeft: 50,
      borderStyle: "solid",
      borderBottomColor: "gray"
    },
    title: {
      fontSize: 16,
      paddingLeft: 10
    },
    addFriendButton:{
      height:19,
      width:130,
      backgroundColor: currentTheme.COLORS.DEFAULT
    },
    stopSharingButton:{  
      height:19,
      width:220,
      backgroundColor: currentTheme.COLORS.DEFAULT
    },
    text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%'
  },
  listItemText: {
    fontSize: 18
  },
  searchButton: {
    width: 20,
    height: 20
  }
  });

export default CircleScreen;

import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  RefreshControl,
  Alert,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as firebase from "firebase";

import currentTheme from "../constants/Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Card from "../components/Card";
import Input from "../components/Input";
import Title from "../components/Title";
import SettingsItem from "../components/SettingsItem";
import { baseURL } from "../constants/utils";
import IconButton from "../components/IconButton";
import { UserContext } from "../communication/UserContext";

const REQUESTS = [
  { userId: "1234", name: "Juan cho" },
  { userId: "123", name: "Juan cho" },
];

const PERSONS = [
  { userId: "1253", name: "aloo" },
  { userId: "1237", name: "aloo" },
];

const EMAIL = "reds@gmail.com";

export default function CircleScreen() {
  const [getGlobalUser, setGlobalUser] = useContext(UserContext);
  const [newPerson, setNewPerson] = useState("");
  const [persons, setPersons] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [viewRequests, setViewRequests] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRefreshing(true);
    const user = await getGlobalUser(true);
    setCurrentUser(user);
    setRefreshing(false);
  };

  const addPerson = () => {
    fetch(baseURL + "/circle", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        uid: currentUser.uid,
      },
      body: JSON.stringify({ me: currentUser.email, friend: newPerson }),
    });
    setNewPerson("");
    Alert.alert("¡Solicitud enviada!");

    setIsAdding(false);
  };

  const acceptPerson = async (email) => {
    fetch(baseURL + "/circle/confirm", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        uid: currentUser.uid,
      },
      body: JSON.stringify({ me: currentUser.email, friend: email }),
    });
    await fetchData();
    Alert.alert("Solicitud aceptada");
  };

  const rejectPerson = async (email) => {
    fetch(baseURL + "/circle/refuse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        uid: currentUser.uid,
      },
      body: JSON.stringify({ me: currentUser.email, friend: email }),
    });
    await fetchData();
    Alert.alert("Solicitud rechazada");
  };

  const removePerson = async (email) => {
    fetch(baseURL + "/circle/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        uid: currentUser.uid,
      },
      body: JSON.stringify({ me: currentUser.email, friend: email }),
    });
    await fetchData();
    Alert.alert("Contacto eliminado");
  };

  let myRequests = null;
  let myCircle = null;
  let memberCount = 0;

  if (currentUser) {
    myRequests = currentUser.solicitudes.map((el) => (
      <Card key={el.email}>
        <Text style={styles.text}> Nombre: {el.name}</Text>
        <Text style={styles.text}> Correo: {el.email}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <IconButton
            title="Rechazar"
            clicked={() => rejectPerson(el.email)}
          />
          <IconButton
            title="Aceptar"
            clicked={() => acceptPerson(el.email)}
          />
        </View>
      </Card>
    ));
    myCircle = currentUser.circle.map((el) => (
      <Card key={el}>
        <Text style={styles.text}>
          {el.name}{"\n"}{"\n"}{el.email}
        </Text>
        <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => { removePerson(el.email) }}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </Card>
    ));
    memberCount = currentUser.circle.length;
  }

  function pressAdd() {
    setIsAdding(true);
  }

  return (

      <View>
        {isAdding === true ? (
          <View style={{ marginTop: '50%'}}>
            <Text style={{fontSize: 18, padding: 20}}>Ingrese el correo electrónico de la persona que quiere agregar</Text>
            <Input
              onChangeText={setNewPerson}
              value={newPerson}
              placeholder="correo"
              />
            <TouchableOpacity
                style={[styles.buttonDelete, {marginTop: 5}]}
                onPress={() => { addPerson()}}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.buttonDelete, {marginTop: 5}]}
                onPress={() => { setIsAdding(false)}}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
            )
            :
            (
    <ScrollView>

      <View style={styles.topView}>
          <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => { pressAdd()}}>
              <MaterialCommunityIcons name="account-plus" size={50} color={currentTheme.COLORS.ACTIVE} />
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.buttonAdd}
              onPress={() => { setViewRequests(true)}}>
            <MaterialCommunityIcons name="bell" size={50} color={currentTheme.COLORS.ACTIVE} />
          </TouchableOpacity>
        </View>

      {viewRequests === true ? (
          <View>
            {myRequests}
            <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => { setViewRequests(false)}}>
              <Text style={styles.buttonText}>Ocultar</Text>
            </TouchableOpacity>
          </View>)
          :
          (
              <ScrollView
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                  }>
                <Title>Mi círculo ({memberCount}/6)</Title>
                {myCircle}
              </ScrollView>
          )
      }

    </ScrollView>

          )}
      </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: currentTheme.COLORS.ACTIVE,
    elevation: 10
  },
  text: {
    color: currentTheme.COLORS.BLACK,
    marginBottom: '10%',
    fontSize: 20,
  },
  textInput: {
    marginTop: 10,
    paddingLeft: 10,
    color: currentTheme.COLORS.ACTIVE,
    fontSize: 20
  },
  buttonAdd: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 10,
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: currentTheme.COLORS.WHITE
  },
  buttonConfirm: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    marginLeft: '32%',
    borderRadius: 50,
    elevation: 10,
    backgroundColor: currentTheme.COLORS.SUCCESS
  },
  buttonDelete: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '35%',
    marginLeft: '32%',
    borderRadius: 10,
    elevation: 10,
    marginBottom: 10,
    borderColor: currentTheme.COLORS.SECONDARY,
    backgroundColor: currentTheme.COLORS.ACTIVE
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
});

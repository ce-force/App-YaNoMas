import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  Button,
  RefreshControl,
  Alert,
} from "react-native";
import * as firebase from "firebase";

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
        <Text> Nombre: {el.name}</Text>
        <Text> Correo: {el.email}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <IconButton
            title="Rechazar"
            clicked={() => rejectPerson(el.email)}
          ></IconButton>
          <IconButton
            title="Aceptar"
            clicked={() => acceptPerson(el.email)}
          ></IconButton>
        </View>
      </Card>
    ));
    myCircle = currentUser.circle.map((el) => (
      <Card key={el}>
        <Text>
          {el.name}: {el.email}
        </Text>
        <IconButton
          title="Eliminar"
          clicked={() => removePerson(el.email)}
        ></IconButton>
      </Card>
    ));
    memberCount = currentUser.circle.length;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
      }
    >
      <Card>
        <Title>Agregar persona de confianza</Title>
        <Input
          onChangeText={setNewPerson}
          value={newPerson}
          placeholder="correo"
        ></Input>
        <IconButton title="Agregar" clicked={addPerson}></IconButton>
        <Title>Solicitudes</Title>
        {myRequests}
        <Title>Mi círculo ({memberCount}/6)</Title>
        {myCircle}
      </Card>
    </ScrollView>
  );
}

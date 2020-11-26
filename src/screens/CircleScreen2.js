import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, RefreshControl } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Title from "../components/Title";
import SettingsItem from "../components/SettingsItem";
import { baseURL } from "../constants/utils";
import IconButton from "../components/IconButton";

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
  const [newPerson, setNewPerson] = useState("");
  const [persons, setPersons] = useState(PERSONS);
  const [requests, setRequests] = useState(REQUESTS);
  const [refreshing, setRefreshing] = useState(false);

  const addPerson = () => {
    fetch(baseURL + "/addCircle", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ me: EMAIL, friend: newPerson }),
    });
  };

  const getRequests = async () => {
    setRefreshing(true);
    const response = await fetch(
      baseURL + "/requests/" + EMAIL
    ).catch((response) => console.log(response));
    let requests = await response.json();
    setRequests(requests);
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getRequests} />
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
        {requests.map((el) => (
          <Card key={el.email}>
            <Text> Nombre: {el.name}</Text>
            <Text> Correo: {el.email}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <IconButton title="Rechazar"></IconButton>
              <IconButton title="Aceptar"></IconButton>
            </View>
          </Card>
        ))}
        <Title>Mis personas de confianza</Title>
        {persons.map((el) => (
          <Card key={el.userId}>
            <Text>{el.name}</Text>
            <IconButton title="Eliminar"></IconButton>
          </Card>
        ))}
      </Card>
    </ScrollView>
  );
}

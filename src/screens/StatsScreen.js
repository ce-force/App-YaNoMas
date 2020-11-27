import React, { useState, useContext, useEffect } from "react";
import { Text, View, TextInput, Alert, ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import Card from "../components/Card";
import Input from "../components/Input";
import Title from "../components/Title";
import { ScrollView } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { UserContext } from "../communication/UserContext";
import IconButton from "../components/IconButton";
import { baseURL } from "../constants/utils";

const FRECUENCY = {
  acoso: 5,
  violacion: 6,
  asalto: 10,
  "actividad sospechosa": 5,
};

const REGIONS = [
  {
    label: "Cartago",
    value: "Cartago",
  },
  {
    label: "Limón",
    value: "Limón",
  },
  {
    label: "San José",
    value: "San José",
  },
  {
    label: "Heredia",
    value: "Heredia",
  },
  {
    label: "Puntarenas",
    value: "Puntarenas",
  },
  {
    label: "Guanacaste",
    value: "Guanacaste",
  },
  {
    label: "Alajuela",
    value: "Alajuela",
  },
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(147, 48, 192, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function StatsScreen() {
  const [getGlobalUser, setGlobalUser] = useContext(UserContext);
  const [frecuency, setFrecuency] = useState(null);
  const [region, setRegion] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const user = await getGlobalUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFrecuency = async () => {
    if (!region) {
      Alert.alert("Por favor seleccione una región");
      return;
    }
    setLoading(true);
    let response = await fetch(baseURL + "/alerts/frecuency", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        uid: currentUser.uid,
      },
      body: JSON.stringify({ region: region }),
    });
    let responseJson = await response.json();

    console.log(responseJson);
    setFrecuency(responseJson);
    setLoading(false);
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator color="blue" size="large"></ActivityIndicator>
      </View>
    );
  }

  let sum = 0;
  let data = { labels: [], data: [] };
  let frencuencies = null;
  if (frecuency) {
    sum = Object.keys(frecuency)
      .map((key) => frecuency[key])
      .reduce((sum, el) => sum + el);

    data = {
      labels: Object.keys(frecuency), // optional
      data: Object.keys(frecuency).map((key) => frecuency[key] / sum),
    };

    frencuencies = Object.keys(frecuency).map((key) => (
      <Card key={key}>
        <Text>
          {key}: {frecuency[key]}
        </Text>
      </Card>
    ));
  }

  return (
    <Card>
      <Title>Estadísticas</Title>
      <Picker
        onValueChange={(val) => {
          if (val) {
            setRegion(val);
          }
        }}
        selectedValue={region}
      >
        <Picker.Item label="Seleccione una provincia" />
        {REGIONS.map((el) => (
          <Picker.Item key={el.label} label={el.label} value={el.value} />
        ))}
      </Picker>
      <IconButton
          title="Actualizar"
          clicked={getFrecuency}
        ></IconButton>
      {frencuencies}
      <ScrollView horizontal>
        <ProgressChart
          data={data}
          width={500}
          height={500}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </ScrollView>
    </Card>
  );
}

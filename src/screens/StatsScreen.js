import React from "react";
import { Text, View, TextInput } from "react-native";
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

const FRECUENCY = {
  acoso: 5,
  violacion: 6,
  asalto: 10,
  "actividad sospechosa": 5,
};

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
  const sum = Object.keys(FRECUENCY)
    .map((key) => FRECUENCY[key])
    .reduce((sum, el) => sum + el);

  const data = {
    labels: Object.keys(FRECUENCY), // optional
    data: Object.keys(FRECUENCY).map((key) => FRECUENCY[key] / sum),
  };
  return (
    <Card>
      <Title>Estadísticas</Title>
      <Picker>
        <Picker.Item label="Seleccione una provincia" />
      </Picker>
      {Object.keys(FRECUENCY).map((key) => (
        <Card key={key}>
          <Text>
            {key}: {FRECUENCY[key]}
          </Text>
        </Card>
      ))}
      <ScrollView horizontal>
        <ProgressChart
          data={data}
          width={400}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </ScrollView>
    </Card>
  );
}

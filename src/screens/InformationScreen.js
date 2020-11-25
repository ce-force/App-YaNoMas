import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import currentTeme from "../constants/Theme";


const DATA = [
  {
    id:"yanomas-v1.0.0-info-001",
    title: "Material Divulgativo #1",
    icon: "information"
  },
  {
    id:"yanomas-v1.0.0-info-002",
    title: "Material Divulgativo #2",
    icon: "information"
  },
  {
    id:"yanomas-v1.0.0-info-003",
    title: "Material Divulgativo #3",
    icon: "information"
  },
  {
    id:"yanomas-v1.0.0-info-004",
    title: "Material Divulgativo #4",
    icon: "information"
  },
  {
    id:"yanomas-v1.0.0-info-005",
    title: "Material Divulgativo #5",
    icon: "information"
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
        />
        <Text style={styles.title} >{title}</Text>
      </View>
    </View>
    </View>
  );
}

function InformationScreen(){
    return (
        <View style={styles.container}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <Item
                  title={item.title}
                  icon={item.icon}
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
      justifyContent: "center",
      top: 55
    },
    item: {
      height: 31,
      paddingLeft: 15,
      borderStyle: "solid",
      borderBottomColor: currentTeme.COLORS.GRAY
    },
    title: {
      fontSize: 16,
      paddingLeft: 10
    }
  });

export default InformationScreen;

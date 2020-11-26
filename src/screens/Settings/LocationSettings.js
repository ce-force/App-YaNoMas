import React, {useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Switch, Alert} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

function LocationSettings(){
  //const [isEnabled, setIsEnabled] = useState(false);
  //const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [switchValue, setSwitchValue] = useState(false);

  const toggleSwitch = (value) => {
    setSwitchValue(value);
    if(value == true){
      activateLocation();
    } else{
      deactivateLocation();
    }
  };

  const activateLocation= () => {
    
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserId: "userId",
        circleUserId: "id",
        state: 'TRUE'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => Alert.alert(JSON.stringify(json)))
  }

  const deactivateLocation = () => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        currentUserId: "userId",
        circleUserId: "id",
        state: 'FALSE'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => Alert.alert(JSON.stringify(json)))
  }


    return (
        <View style={styles.container}>
            <Text>Modo Anónimo</Text>

            <Text>{switchValue ? 'Switch is ON' : 'Switch is OFF'}</Text>
        <Switch
          style={{ marginTop: 30 }}
          onValueChange={toggleSwitch}
          value={switchValue}
        />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center"
    }
  });

export default LocationSettings;

import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { createPet } from "../../../api";
import RNPickerSelect from "react-native-picker-select";

const CreateScreen = ({ navigation }) => {
  const [petData, setPetData] = useState({
    id: null,
    name: null,
    status: "available",
  });

  const createAlertSuccess = () => {
    Alert.alert("Alerta Succes", "Intrarea a fost adaugata cu succes", [
      { text: "OK", onPress: () => navigation.navigate("list") },
    ]);
  };

  const createAlertValidate = () => {
    Alert.alert(
      "Alerta Validare",
      "Datele de intrare sunt incorecte. Va rugam verificati.",
      [{ text: "OK" }]
    );
  };

  const createAlertError = () => {
    Alert.alert(
      "Alerta Eroare",
      "Datele nu au fost create. Va rugam incercati mai tarziu in cazul in care nu merge serverul.",
      [{ text: "OK" }]
    );
  };

  const addPet = () => {
    // Validate form inputs
    const { id, name, status } = petData;
    if (!id || !name || !status || isNaN(id) || !status.length) {
      createAlertValidate();
    } else {
      createPet(id, name, status).then((response) => {
        if (response) {
          createAlertSuccess();
        } else {
          createAlertError();
        }
      });
    }
  };

  return (
    <LinearGradient colors={["#ccffcc", "white"]} style={styles.container}>
      <ImageBackground
        source={require("../../../assets/marks.png")}
        resizeMode="cover"
        style={styles.container}
        imageStyle={styles.backgroundimage}
      >
        <View style={styles.Inputpadding}>
          <Text>Id:</Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter new id"
            onChangeText={(newText) =>
              setPetData((prevState) => ({ ...prevState, id: newText }))
            }
            keyboardType="number-pad"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text>Nume:</Text>
          <TextInput
            style={styles.input}
            placeholder="Please enter new name"
            onChangeText={(newText) =>
              setPetData((prevState) => ({ ...prevState, name: newText }))
            }
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text>Status:</Text>
          <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(currentStatus) =>
              setPetData((prevState) => ({
                ...prevState,
                status: currentStatus,
              }))
            }
            items={[
              { label: "Available", value: "available" },
              { label: "Pending", value: "pending" },
              { label: "Sold", value: "sold" },
            ]}
            value={petData.status}
            placeholder={{}}
          />
          <View style={styles.btn}>
            <TouchableOpacity onPress={addPet}>
              <Text style={styles.btnText}>Adaugare</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Inputpadding: {
    padding: 16,
  },
  backgroundimage: {
    opacity: 0.15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btn: {
    width: 70,
    height: 30,
    backgroundColor: "#19e6e6",
    borderRadius: 5,
    margin: 2,
  },
  btnText: { textAlign: "center", color: "#000", marginTop: 4 },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    color: "black",
    paddingRight: 30,
    marginVertical: 20,
  },
});

export default CreateScreen;

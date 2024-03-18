import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { createPet } from "../../../api";
import styles from "./CreateScreenStyles";
import PickerComponent from "../../components/PickerComponent/PickerComponent";

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
          <PickerComponent
            value={petData.status}
            onValueChange={(currentStatus) =>
              setPetData((prevState) => ({
                ...prevState,
                status: currentStatus,
              }))
            }
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

export default CreateScreen;

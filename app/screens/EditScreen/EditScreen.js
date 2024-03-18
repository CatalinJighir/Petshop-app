import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { updatePet, findPet } from "../../../api";
import styles from "./EditScreenStyles";
import PickerComponent from "../../components/PickerComponent/PickerComponent";

const EditScreen = ({ route, navigation }) => {
  const [petData, setPetData] = useState({
    id: null,
    name: null,
    status: "available",
  });

  useEffect(() => {
    getPetById(route.params.id);
  }, []);

  const getPetById = (id) => {
    findPet(id).then((response) => {
      setPetData({
        id: response.id.toString(),
        name: response.name,
        status: response.status,
      });
    });
  };

  const createAlertSuccess = () => {
    Alert.alert("Alerta Succes", "Intrarea a fost editata cu succes", [
      { text: "OK", onPress: () => navigation.navigate("list") },
    ]);
  };

  const createAlertValidate = () => {
    Alert.alert(
      "Alerta Validare",
      "Editatea este incorecta. Va rugam verificati.",
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

  const editPet = () => {
    const { id, name, status } = petData;
    // Validate form inputs
    if (!id || !name || !status || isNaN(id) || !status.length) {
      createAlertValidate();
    } else {
      updatePet(id, name, status).then((response) => {
        if (response) {
          createAlertSuccess();
        } else {
          createAlertError();
        }
      });
    }
  };

  const setName = (newText) => {
    setPetData((prevState) => ({ ...prevState, name: newText }));
  };

  const setStatus = (newStatus) => {
    setPetData((prevState) => ({ ...prevState, status: newStatus }));
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
            defaultValue={petData.id}
            editable={false}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text>Nume:</Text>
          <TextInput
            style={styles.input}
            defaultValue={petData.name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text>Status:</Text>
          <PickerComponent value={petData.status} onValueChange={setStatus} />
          <View style={styles.btn}>
            <TouchableOpacity onPress={editPet}>
              <Text style={styles.btnText}>Editare</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default EditScreen;

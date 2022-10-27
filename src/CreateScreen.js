import React, { Component } from "react";
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
import { createPet } from "../api";
import { Picker } from "@react-native-picker/picker";

class CreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      status: "available",
    };
  }

  createAlertSuccess() {
    Alert.alert("Alerta Succes", "Intrarea a fost adaugata cu succes", [
      { text: "OK", onPress: () => this.props.navigation.navigate("list", {}) },
    ]);
  }

  createAlertValidate() {
    Alert.alert(
      "Alerta Validare",
      "Datele de intrare sunt incorecte. Va rugam verificati.",
      [
        {
          text: "OK",
        },
      ]
    );
  }

  createAlertError() {
    Alert.alert(
      "Alerta Eroare",
      "Datele nu au fost create. Va rugam incercati mai tarziu in cazul in care nu merge serverul.",
      [
        {
          text: "OK",
        },
      ]
    );
  }

  addPet() {
    // Validate form inputs
    if (
      this.state.id === null ||
      this.state.name === null ||
      this.state.status === null ||
      this.state.id.length === 0 ||
      this.state.name.length === 0 ||
      isNaN(this.state.id) ||
      this.state.status.length === 0
    ) {
      this.createAlertValidate();
    } else {
      createPet(this.state.id, this.state.name, this.state.status).then(
        (response) => {
          if (response) {
            this.createAlertSuccess();
          } else {
            this.createAlertError();
          }
        }
      );
    }
  }

  setId(newText) {
    const state = this.state;
    state.id = newText;
    this.setState(state);
  }
  setName(newText) {
    const state = this.state;
    state.name = newText;
    this.setState(state);
  }
  setStatus(newText) {
    const state = this.state;
    state.status = newText;
    this.setState(state);
  }

  render() {
    return (
      <LinearGradient colors={["#ccffcc", "white"]} style={styles.container}>
        <ImageBackground
          source={require("../assets/marks.png")}
          resizeMode="cover"
          style={styles.container}
          imageStyle={styles.backgroundimage}
        >
          <View style={styles.Intupadding}>
            <Text>Id:</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter new id"
              onChangeText={(newText) => this.setId(newText)}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text>Nume:</Text>
            <TextInput
              style={styles.input}
              placeholder="Please enter new name"
              onChangeText={(newText) => this.setName(newText)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text>Status:</Text>
            <Picker
              selectedValue={this.state.status}
              onValueChange={(currentStatus) => this.setStatus(currentStatus)}
            >
              <Picker.Item label="Available" value="available" />
              <Picker.Item label="Pending" value="pending" />
              <Picker.Item label="Sold" value="sold" />
            </Picker>
            <View style={styles.btn}>
              <TouchableOpacity onPress={() => this.addPet()}>
                <Text style={styles.btnText}>Adaugare</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Intupadding: {
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

export default CreateScreen;

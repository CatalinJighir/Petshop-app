import React, { Component } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { findPet } from "../api";

class ViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pet: {
        id: "Acest element se incarca",
        name: "Acest element se incarca",
        photoUrls: "Acest element se incarca",
        status: "Acest element se incarca",
        tags: "Acest element se incarca",
      },
    };
    this.getPetById(this.props.route.params.id);
  }

  getPetById(id) {
    findPet(id).then((response) => {
      const state = this.state;
      state.pet = response;

      // Default values in case of missing information from server
      if (state.pet.photoUrls.length === 0) {
        state.pet.photoUrls = "Acest element nu are poza";
      }
      if (state.pet.tags.length === 0) {
        state.pet.tags = "Acest element nu are tag-uri";
      }
      if (state.pet.id.length === 0) {
        state.pet.id = "Acest element nu are id";
      }
      if (state.pet.name.length === 0) {
        state.pet.name = "Acest element nu are nume";
      }
      if (state.pet.status.length === 0) {
        state.pet.status = "Acest element nu are status";
      }

      this.setState(state);
    });
  }

  render() {
    return (
      <>
        <LinearGradient colors={["#ccffcc", "white"]} style={styles.container}>
          <ImageBackground
            source={require("../assets/marks.png")}
            resizeMode="cover"
            style={styles.container}
            imageStyle={styles.backgroundimage}
          >
            <View style={styles.Inputpadding}>
              <Text style={styles.styletext}>Id:{this.state.pet.id}</Text>
              <Text style={styles.styletext}>Nume:{this.state.pet.name}</Text>
              <Text style={styles.styletext}>
                PhotoUrls:{this.state.pet.photoUrls}
              </Text>
              <Text style={styles.styletext}>Tags:{this.state.pet.tags}</Text>
              <Text style={styles.styletext}>
                Status:{this.state.pet.status}
              </Text>
            </View>
          </ImageBackground>
        </LinearGradient>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Inputpadding: {
    padding: 16,
  },
  styletext: {
    margin: 2,
  },
  backgroundimage: {
    opacity: 0.15,
  },
});

export default ViewScreen;

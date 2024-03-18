import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { findPet } from "../../../api";
import styles from "./ViewScreenStyles";

const ViewScreen = ({ route }) => {
  const [pet, setPet] = useState({
    id: "Acest element se incarca",
    name: "Acest element se incarca",
    photoUrls: "Acest element se incarca",
    status: "Acest element se incarca",
    tags: "Acest element se incarca",
  });

  useEffect(() => {
    getPetById(route.params.id);
  }, []);

  const getPetById = (id) => {
    findPet(id).then((response) => {
      const updatedPet = { ...response };

      // Default values in case of missing information from server
      if (updatedPet.photoUrls.length === 0) {
        updatedPet.photoUrls = "Acest element nu are poza";
      }
      if (updatedPet.tags.length === 0) {
        updatedPet.tags = "Acest element nu are tag-uri";
      }
      if (updatedPet.id.length === 0) {
        updatedPet.id = "Acest element nu are id";
      }
      if (updatedPet.name.length === 0) {
        updatedPet.name = "Acest element nu are nume";
      }
      if (updatedPet.status.length === 0) {
        updatedPet.status = "Acest element nu are status";
      }

      setPet(updatedPet);
    });
  };

  return (
    <>
      <LinearGradient colors={["#ccffcc", "white"]} style={styles.container}>
        <ImageBackground
          source={require("../../../assets/marks.png")}
          resizeMode="cover"
          style={styles.container}
          imageStyle={styles.backgroundimage}
        >
          <View style={styles.Inputpadding}>
            <Text style={styles.styletext}>Id: {pet.id}</Text>
            <Text style={styles.styletext}>Nume: {pet.name}</Text>
            <Text style={styles.styletext}>PhotoUrls: {pet.photoUrls}</Text>
            <Text style={styles.styletext}>Tags: {pet.tags}</Text>
            <Text style={styles.styletext}>Status: {pet.status}</Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </>
  );
};

export default ViewScreen;

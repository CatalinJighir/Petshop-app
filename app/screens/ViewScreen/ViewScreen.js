import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { findPet } from "../../../api";
import styles from "./ViewScreenStyles";

const ViewScreen = ({ route }) => {
  const [pet, setPet] = useState(null);

  useEffect(() => {
    getPetById(route.params.id);
  }, []);

  const getPetById = (id) => {
    findPet(id).then((response) => {
      if (response) {
        const updatedPet = {
          id: response.id.toString(),
          name: response.name ?? "This item has no name",
          photoUrls:
            response.photoUrls && response.photoUrls.length > 0
              ? response.photoUrls.join(", ")
              : "This item has no picture",
          tags:
            response.tags && response.tags.length > 0
              ? response.tags.map((tag) => tag.name).join(", ")
              : "This item has no tags",
          status: response.status ?? "This item has no status",
        };

        setPet(updatedPet);
      } else {
        setPet({
          id: "This item has no id",
          name: "This item has no name",
          photoUrls: "This item has no picture",
          tags: "This item has no tags",
          status: "This item has no status",
        });
      }
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
            {pet && (
              <>
                <Text style={styles.styletext}>Id: {pet.id}</Text>
                <Text style={styles.styletext}>Name: {pet.name}</Text>
                <Text style={styles.styletext}>PhotoUrls: {pet.photoUrls}</Text>
                <Text style={styles.styletext}>Tags: {pet.tags}</Text>
                <Text style={styles.styletext}>Status: {pet.status}</Text>
              </>
            )}
          </View>
        </ImageBackground>
      </LinearGradient>
    </>
  );
};

export default ViewScreen;

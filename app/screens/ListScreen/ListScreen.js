import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { withNavigation } from "react-navigation";
import { findPets, deletePet } from "../../../api";
import RNPickerSelect from "react-native-picker-select";
import styles from "./ListScreenStyles";

const ListScreen = ({ navigation }) => {
  const [tableData, setTableData] = useState([]);
  const [status, setStatus] = useState("available");
  const [modalVisible, setModalVisible] = useState(false);
  const [idToRemove, setIdToRemove] = useState(null);

  useEffect(() => {
    getPetsByStatus(status);
  }, [status, tableData]);

  const _Create = () => {
    navigation.navigate("create");
  };

  const getPetsByStatus = (status) => {
    findPets(status).then((response) => {
      setTableData(response.slice(0, 50));
    });
  };

  const _GoToEditScreen = (index) => {
    navigation.navigate("edit", { id: tableData[index].id });
  };

  const _GoToViewScreen = (index) => {
    navigation.navigate("view", { id: tableData[index].id });
  };

  const _Delete = (index) => {
    setIdToRemove(tableData[index].id);
    setModalVisible(true);
  };

  const removePet = () => {
    deletePet(idToRemove).then((response) => {
      setModalVisible(false);
      if (response) {
        createAlertSuccess();
        getPetsByStatus(status);
      } else {
        createAlertError();
      }
    });
  };

  const createAlertSuccess = () => {
    Alert.alert("Alerta Succes", "Intrarea a fost stearsa cu succes", [
      { text: "OK", onPress: () => navigation.navigate("list", {}) },
    ]);
  };

  const createAlertError = () => {
    Alert.alert(
      "Alerta Eroare",
      "Datele nu au fost sterse. Va rugam incercati mai tarziu in cazul in care nu merge serverul.",
      [{ text: "OK" }]
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.btn} android_ripple={{ color: "green" }}>
          <TouchableOpacity onPress={_Create}>
            <Text style={styles.btnText}>Adaugare</Text>
          </TouchableOpacity>
        </View>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={(value) => setStatus(value)}
          items={[
            { label: "Available", value: "available" },
            { label: "Pending", value: "pending" },
            { label: "Sold", value: "sold" },
          ]}
          value={status}
          placeholder={{}}
        />
        <ScrollView style={styles.scrollbar}>
          <Table borderStyle={{ borderColor: "transparent", borderWidth: 1 }}>
            <Row
              data={["Index", "Nume", "Status", "Actiuni"]}
              style={styles.head}
              textStyle={styles.text}
            />
            {tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                <Cell textStyle={styles.text} data={index + 1} />
                <Cell textStyle={styles.text} data={rowData.name} />
                <Cell textStyle={styles.text} data={rowData.status} />
                <Cell
                  textStyle={styles.text}
                  data={
                    <View>
                      <TouchableOpacity onPress={() => _GoToViewScreen(index)}>
                        <View style={styles.btnView}>
                          <Text style={styles.btnTextTable}>vizualizare</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => _GoToEditScreen(index)}>
                        <View style={styles.btnEdit}>
                          <Text style={styles.btnTextTable}>editare</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => _Delete(index)}>
                        <View style={styles.btnDelete}>
                          <Text style={styles.btnTextTable}>stergere</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  }
                />
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Sunteti sigur ca vreti sa stergeti?
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={removePet}
              >
                <Text style={styles.textStyle}>Da</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Nu</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

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

export default withNavigation(ListScreen);

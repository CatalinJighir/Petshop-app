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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ccffcc",
    paddingBottom: 50,
  },
  head: {
    height: 40,
    backgroundColor: "#19e6e6",
    borderWidth: 1,
  },
  text: {
    margin: 6,
    color: "black",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#ffffcc",
    borderWidth: 1,
  },
  btn: {
    width: 100,
    height: 30,
    backgroundColor: "#19e6e6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    color: "#000",
    fontSize: 14,
  },
  btnTextTable: {
    textAlign: "center",
    color: "#000",
    elevation: 2,
  },
  btnView: {
    backgroundColor: "#0d6efd",
    width: 80,
    height: 20,
    borderRadius: 5,
    margin: 2,
  },
  btnEdit: {
    backgroundColor: "#198754",
    width: 80,
    height: 20,
    borderRadius: 5,
    margin: 2,
  },
  btnDelete: {
    backgroundColor: "#dc3545",
    width: 80,
    height: 20,
    borderRadius: 5,
    margin: 2,
  },
  scrollbar: { marginTop: -1 },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
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

export default withNavigation(ListScreen);

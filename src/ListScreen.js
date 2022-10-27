import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { withNavigation } from "react-navigation";
import { findPets, deletePet } from "../api";
import { Picker } from "@react-native-picker/picker";

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Index", "Nume", "Status", "Actiuni"],
      tableData: [],
      status: "available",
      modalVisible: false,
      idToRemove: null,
    };
    this.getPetsByStatus(this.state.status);
  }

  _Create() {
    this.props.navigation.navigate("create");
  }

  getPetsByStatus(status) {
    findPets(status).then((response) => {
      const state = this.state;
      state.tableData = response.splice(0, 50);
      this.setState(state);
    });
  }

  setStatus(currentStatus) {
    const state = this.state;
    state.status = currentStatus;
    this.setState(state);
    this.getPetsByStatus(this.state.status);
  }

  _GoToEditScreen(index) {
    this.props.navigation.navigate("edit", {
      id: this.state.tableData[index].id,
    });
  }

  _GoToViewScreen(index) {
    this.props.navigation.navigate("view", {
      id: this.state.tableData[index].id,
    });
  }

  _Delete(index) {
    const state = this.state;
    state.idToRemove = this.state.tableData[index].id;
    this.setState(state);
    this.setModalVisible(true);
  }

  removePet() {
    deletePet(this.state.idToRemove).then((response) => {
      this.setModalVisible(false);
      if (response) {
        this.createAlertSuccess();
        this.getPetsByStatus(this.state.status);
      } else {
        this.createAlertError();
      }
    });
  }

  createAlertSuccess() {
    Alert.alert("Alerta Succes", "Intrarea a fost stearsa cu succes", [
      { text: "OK", onPress: () => this.props.navigation.navigate("list", {}) },
    ]);
  }

  createAlertError() {
    Alert.alert(
      "Alerta Eroare",
      "Datele nu au fost sterse. Va rugam incercati mai tarziu in cazul in care nu merge serverul.",
      [
        {
          text: "OK",
        },
      ]
    );
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const state = this.state;
    // View , Edit, Delete buttons
    const element = (data, index) => (
      <View>
        <TouchableOpacity onPress={() => this._GoToViewScreen(index)}>
          <View style={styles.btnView}>
            <Text style={styles.btnTextTable}>vizualizare</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._GoToEditScreen(index)}>
          <View style={styles.btnEdit}>
            <Text style={styles.btnTextTable}>editare</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._Delete(index)}>
          <View style={styles.btnDelete}>
            <Text style={styles.btnTextTable}>stergere</Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <>
        <StatusBar style="white" />
        <View style={styles.container}>
          <View style={styles.btn} android_ripple={{ color: "green" }}>
            <TouchableOpacity onPress={() => this._Create()}>
              <Text style={styles.btnText}>Adaugare</Text>
            </TouchableOpacity>
          </View>
          <Picker
            style={styles.pick}
            selectedValue={this.state.status}
            onValueChange={(currentStatus) => this.setStatus(currentStatus)}
          >
            <Picker.Item label="Available" value="available" />
            <Picker.Item label="Pending" value="pending" />
            <Picker.Item label="Sold" value="sold" />
          </Picker>
          <ScrollView style={styles.scrollbar}>
            <Table borderStyle={{ borderColor: "transparent", borderWidth: 1 }}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {
                    <>
                      <Cell textStyle={styles.text} data={index + 1} />
                      <Cell textStyle={styles.text} data={rowData.name} />
                      <Cell textStyle={styles.text} data={rowData.status} />
                      <Cell
                        textStyle={styles.text}
                        data={element(rowData, index)}
                      />
                    </>
                  }
                </TableWrapper>
              ))}
            </Table>
          </ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Sunteti sigur ca vreti sa stergeti?
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.removePet()}
                >
                  <Text style={styles.textStyle}>Da</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                  <Text style={styles.textStyle}>Nu</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ccffcc",
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
  img: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#ffffcc",
    borderWidth: 1,
  },
  btn: {
    width: 80,
    height: 30,
    backgroundColor: "#19e6e6",
    borderRadius: 5,
    margin: 2,
  },
  btnText: {
    textAlign: "center",
    color: "#000",
    elevation: 2,
    marginTop: 4,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
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

export default withNavigation(ListScreen);

import React, { useState, useEffect } from "react";
import {
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
import styles from "./ListScreenStyles";
import PickerComponent from "../../components/PickerComponent/PickerComponent";

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
    Alert.alert("Alert Success", "The entry was successfully deleted", [
      { text: "OK", onPress: () => navigation.navigate("list", {}) },
    ]);
  };

  const createAlertError = () => {
    Alert.alert(
      "Alert Error",
      "The data has not been deleted. Please try again later if the server is down.",
      [{ text: "OK" }]
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.btn}>
          <TouchableOpacity onPress={_Create}>
            <Text style={styles.btnText}>Add new entry</Text>
          </TouchableOpacity>
        </View>
        <PickerComponent
          value={status}
          onValueChange={(value) => setStatus(value)}
        />
        <ScrollView style={styles.scrollbar}>
          <Table borderStyle={{ borderColor: "transparent", borderWidth: 1 }}>
            <Row
              data={["Index", "Name", "Status", "Actions"]}
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
                          <Text style={styles.btnTextTable}>View</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => _GoToEditScreen(index)}>
                        <View style={styles.btnEdit}>
                          <Text style={styles.btnTextTable}>Edit</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => _Delete(index)}>
                        <View style={styles.btnDelete}>
                          <Text style={styles.btnTextTable}>Delete</Text>
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
                Are you sure you want to delete?
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={removePet}
              >
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCloseNo]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default withNavigation(ListScreen);

import { StyleSheet } from "react-native";

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
    borderWidth: 1,
    borderColor: "#000",
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
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 50,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 2,
  },
  buttonClose: {
    backgroundColor: "#90EE90",
  },
  buttonCloseNo: {
    backgroundColor: "#FF7F7F",
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

export default styles;

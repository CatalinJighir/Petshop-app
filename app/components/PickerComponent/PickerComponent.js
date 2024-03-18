import RNPickerSelect from "react-native-picker-select";
import { StyleSheet } from "react-native";

const PickerComponent = ({ onValueChange, value }) => {
  return (
    <RNPickerSelect
      style={pickerSelectStyles}
      onValueChange={onValueChange}
      items={[
        { label: "Available", value: "available" },
        { label: "Pending", value: "pending" },
        { label: "Sold", value: "sold" },
      ]}
      value={value}
      placeholder={{}}
    />
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

export default PickerComponent;

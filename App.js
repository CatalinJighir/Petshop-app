import { StyleSheet, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "./src/ListScreen";
import CreateScreen from "./src/CreateScreen";
import EditScreen from "./src/EditScreen";
import ViewScreen from "./src/ViewScreen";

const Stack = createNativeStackNavigator();
// Navivate to pages
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
            textTransform: "uppercase",
          },
          headerStyle: {
            backgroundColor: "#19e6e6",
          },
          headerRight: (props) => (
            <Image
              style={{ width: 50, height: 50 }}
              source={require("./assets/logo.png")}
              resizeMode="contain"
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerTitle: "List" }}
          name="list"
          component={ListScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "Create" }}
          name="create"
          component={CreateScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "Edit" }}
          name="edit"
          component={EditScreen}
        />
        <Stack.Screen
          options={{ headerTitle: "View" }}
          name="view"
          component={ViewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

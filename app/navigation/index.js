import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../screens/ListScreen/ListScreen";
import EditScreen from "../screens/EditScreen/EditScreen";
import CreateScreen from "../screens/CreateScreen/CreateScreen";
import ViewScreen from "../screens/ViewScreen/ViewScreen";

const Stack = createNativeStackNavigator();
// Navivate to pages
export default function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            backgroundColor: "#19e6e6",
          },
          headerRight: () => (
            <Image
              style={{ width: 40, height: 40, alignSelf: "center" }}
              source={require("../../assets/logo.png")}
              resizeMode="contain"
            />
          ),
        }}
      >
        <Stack.Screen
          options={{ headerTitle: "Main Screen" }}
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

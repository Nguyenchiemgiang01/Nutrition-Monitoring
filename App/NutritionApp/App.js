import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/Login/LoginScreen";
import SignupScreen from "./src/pages/Signup/SignupScreen";
import PersonalInfo from "./src/pages/PersonalInfor/PersonalInfo";
import UserpageScreen from "./src/pages/Userpage/UserpageScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="Userpage" component={UserpageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import { Text, View } from "react-native";
import CmpA from "./src/CmpA";
import CmpB from "./src/CmpB";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  const val = 10;
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CmpA" component={CmpA} />
      <Stack.Screen name="CmpB" component={CmpB} />
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default App;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import TestScreen from './screen/TestScreen';
import { HomeScreen } from './screen/HomeScreen';
import DemoScreen from './screen/DemoScreen';


// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

export const theme = extendTheme({ config });

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home"
      >

       
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />


        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="DemoScreen" component={DemoScreen} />
        
    
             

        {/* <Drawer.Screen
          name="GioiThieuScreen"
          component={DrawerNavigator}
          options={{ header: () => <Header /> }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

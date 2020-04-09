import React from 'react';
import Login from "./src/pages/nova_senha";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import nova_senha from './src/pages/cadastro_de_plantas';
import cadastro_de_plantas from './src/pages/cadastro_de_plantas';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="cadastro_de_plantas" component={cadastro_de_plantas} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
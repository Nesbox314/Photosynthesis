import React from 'react';
import Login from "./src/pages/nova_senha";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CadastroUsuario from './src/pages/cadastroUsuario';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="cadastroUsuario" component={CadastroUsuario} />
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
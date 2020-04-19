import React from 'react';
import Login from "./src/pages/login";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CadastroUsuario from './src/pages/cadastroUsuario';
import Solicitar_n_senha from './src/pages/Solicitar_n_senha';
import nova_senha from './src/pages/nova_senha';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="cadastroUsuario" component={CadastroUsuario} />
      <Stack.Screen name="solicitar_n_senha" component={Solicitar_n_senha} />
      <Stack.Screen name="nova_senha" component={nova_senha} />

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
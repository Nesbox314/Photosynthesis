import React from 'react';
import Login from "./src/pages/login";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CadastroUsuario from './src/pages/cadastroUsuario';
import Solicitar_n_senha from './src/pages/Solicitar_n_senha';
import nova_senha from './src/pages/nova_senha';
import Homepage from './src/pages/homepage';
import PerfilUsuario from './src/pages/perfilUsuario';
import editarPerfilUsuario from './src/pages/editarPerfilUsuario';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="cadastroUsuario" component={CadastroUsuario} />
      <Stack.Screen name="solicitar_n_senha" component={Solicitar_n_senha} />
      <Stack.Screen name="nova_senha" component={nova_senha} />
      <Stack.Screen name="Homepage" component={Homepage}/>
      <Stack.Screen name="PerfilUsuario" component={PerfilUsuario}/>
      <Stack.Screen name="editarPerfilUsuario" component={editarPerfilUsuario}/>

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

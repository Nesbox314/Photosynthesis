import React from 'react';
import Login from "./src/pages/login";

import { createStackNavigator } from '@react-navigation/stack';
import CadastroUsuario from './src/pages/cadastroUsuario';
import Solicitar_n_senha from './src/pages/Solicitar_n_senha';
import nova_senha from './src/pages/nova_senha';
import Homepage from './src/pages/homepage';
import PerfilUsuario from './src/pages/perfilUsuario';
import editarPerfilUsuario from './src/pages/editarPerfilUsuario';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="login">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="cadastroUsuario" component={CadastroUsuario} />
          <Stack.Screen name="solicitar_n_senha" component={Solicitar_n_senha} />
          <Stack.Screen name="nova_senha" component={nova_senha} />
          <Stack.Screen name="Homepage" component={Homepage}/>
          <Stack.Screen name="PerfilUsuario" component={PerfilUsuario}/>
          <Stack.Screen name="editarPerfilUsuario" component={editarPerfilUsuario}/>
          <Stack.Screen name="Redirect" component={Redirect}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

export function Redirect() {
  return (
    <NavigationContainer independent="true">
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Social') {
              iconName = focused ? 'md-home' : 'md-home';
            } else if (route.name === 'Monitoramento') {
              iconName = focused ? 'md-leaf' : 'md-leaf';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'green',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Social" component={Homepage} />
        <Tab.Screen name="Monitoramento" component={Homepage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homepage from './homepage';
import { Ionicons } from '@expo/vector-icons';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Redirect() {
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
        <Tab.Screen name="Monitoramento" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
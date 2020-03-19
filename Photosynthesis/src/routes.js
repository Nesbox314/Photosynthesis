import Login from './pages/login';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={Login} />
      </Stack.Navigator>
    );
}
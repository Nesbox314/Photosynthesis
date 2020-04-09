import Login from './pages/nova_senha';

import { createStackNavigator } from '@react-navigation/stack';
import nova_senha from './pages/nova_senha';

const Stack = createStackNavigator();

export function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={nova_senha} />
      </Stack.Navigator>
    );
}
import Login from './pages/nova_senha';

import { createStackNavigator } from '@react-navigation/stack';
import nova_senha from './pages/cadastro_de_plantas';

const Stack = createStackNavigator();

export function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={nova_senha} />
      </Stack.Navigator>
    );
}
import Login from './pages/login';

<<<<<<< Updated upstream
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
=======
//import Login from './pages/login';
import Solicitar_n_senha from './pages/Solicitar_n_senha';

export default createStackNavigator({
   // Login
   // Homepage
    Solicitar_n_senha
},
{
    //navigationOptions: {
      //  headerStyle:{
        //    backgroundColor: "#ff0000" 
       // },
        //headerTintColor:"#ff0"
    //},
>>>>>>> Stashed changes

export function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={Login} />
      </Stack.Navigator>
    );
}
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PerfilUsuario from '../perfilUsuario';
import editarPerfilUsuario from '../editarPerfilUsuario';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../login';
import CadastroUsuario from '../cadastroUsuario';
import solicitar_n_senha from '../Solicitar_n_senha';
import nova_senha from '../nova_senha';
import Homepage from '../homepage';
import Monitoring from '../homepageSecundaria';
import TabNavigator from '../component/tabNavigator';
import NovaPostagem from '../novaPostagem';
import ConfirmacaoMonitoring from '../ConfirmaçãoMonitoring';
import ExcluirMonitoramento from '../ExclusaoDoMoitoramento';
import configuracaoDeMonitoramento from '../configuracaoDeMonitoramento';
import cadastroDePlantas from '../cadastroDePlantas';
import HomepageSecunsaria from '../homepageSecundaria';
import HomepageSelect from '../homepageSelect';
import { Social } from '../social';
import EditarMonitoramento from '../editarMonitoramento';
import Instrucoes from '../Instrucoes ';


const Stack = createStackNavigator();

export default class StackNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="cadastroUsuario" component={CadastroUsuario} deviceLocale="ptBR"/>
                    <Stack.Screen name="solicitar_n_senha" component={solicitar_n_senha} />
                    <Stack.Screen name="nova_senha" component={nova_senha} />
                    <Stack.Screen name="Homepage" component={Homepage} />
                    <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} />
                    <Stack.Screen name="editarPerfilUsuario" component={editarPerfilUsuario} />
                    <Stack.Screen name="Redirect" component={TabNavigator} />
                    <Stack.Screen name="Monitoramento" component={Monitoring} />
                    <Stack.Screen name="NovaPostagem" component={NovaPostagem} />
                    <Stack.Screen name="ConfirmacaoMonitoring" component={ConfirmacaoMonitoring} />
                    <Stack.Screen name="Instrucoes" component={Instrucoes}/>
                    <Stack.Screen name="EditarMonitoramento" component={EditarMonitoramento} />
                    <Stack.Screen name="configuracaoDeMonitoramento" component={configuracaoDeMonitoramento}/>
                    <Stack.Screen name="cadastroDePlantas" component={cadastroDePlantas}/>
                    <Stack.Screen name="HomepageSecunsaria" component={HomepageSecunsaria}/>
                    <Stack.Screen name="HomepageSelect" component={HomepageSelect}/>
                    <Stack.Screen name="Social" component={Social} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        title: "Tela de login"
    };
    
    render(){
        return (
            <View>
                <Text>Página de Login</Text>
            </View>
        )
    }
}
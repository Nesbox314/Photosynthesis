import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        title: "Tela Inícial"
    };
    
    render(){
        return (
            <View>
                <Text>Tela Inícial</Text>
            </View>
        )
    }
}
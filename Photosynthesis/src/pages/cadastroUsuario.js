import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
//import api from '../services/api';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const api = axios.create({
    baseURL: 'http:\\192.168.1.8:3000'
});

export default class CadastroUsuario extends Component {

       submit(){
        console.log('Início da submissão de dados');

        api.post('/usuarios/postUsuarios', {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log('Fim da submissão de dados');
    }

    render(){
        console.log('Início da renderização da tela');
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View>
                    <TouchableOpacity activeOpacity = { .5 } onPress={() => this.props.navigation.navigate('login')}>
                        <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                    </TouchableOpacity>
                </View>
                <View>
                    <Image source={require('../../assets/userPhoto.png')} style={styles.logo} onPress={() => this.props.navigation.navigate('login')}></Image>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nome"} onChangeText={(nome) => this.setState({nome})}/>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "E-mail"} onChangeText={(email) => this.setState({email})}/>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Senha"} onChangeText={(senha) => this.setState({senha})}/>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Confirmar senha"}/>
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Cadastrar"} onPress={() => this.submit()}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    back: {
        height: 35,
        width: 35,
        marginTop: 25,
        marginLeft: 3
    },
    logo: {
        height: 250,
        width: 250,
        alignSelf: "center"
    },
    input: {
        alignSelf: "center",
        backgroundColor: 'rgb(247, 246, 246)',
        borderColor: 'rgb(242, 241, 241)',
        borderWidth: 1,
        marginTop: 10,
        height: 50,
        width: 320,
        borderRadius: 4
    },
    inputs: {
        marginTop: 40  
    },
    button: {
        alignSelf: "center",
        marginTop: 20,
        width: 320
    },
    back: {
        width: 30,
        height: 30,
        marginTop: 50,
        marginLeft: 20
      },
})

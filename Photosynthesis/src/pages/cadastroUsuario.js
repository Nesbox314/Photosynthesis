import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
//import api from '../services/api';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http:\\192.168.1.8:3000'
});

export default class CadastroUsuario extends Component {

       submit(){
        let collection = {};
        collection.nome = this.state.nome;
        collection.email = this.state.email;
        collection.senha = this.state.senha;

        console.log(collection);

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

       /* fetch(url, {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));*/
    }

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View>
                    <Image onPress={() => this.props.navigation.navigate('login')} source={require('../../assets/back.png')} style={styles.back}></Image>
                </View>
                <View>
                    <Image source={require('../../assets/userPhoto.png')} style={styles.logo}></Image>
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
    }
})

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http:\\192.168.1.8:3000'
});

export default class Login extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View>
                    <Image source={require('../../assets/logo.png')} style={styles.logo}></Image>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "E-mail ou nome do usuário"} onChangeText={(email) => this.setState({ email })}/>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Senha"} onChangeText={(senha) => this.setState({ senha })}/>
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Entrar"} onPress={() => this.props.navigation.navigate('Homepage')}/>
                </View>
                <View style={styles.button}>
                    <Text style={styles.helpSenha}>Esqueceu seus dados de entrada? <Text style={styles.helpSenha, {fontWeight: "bold"}} onPress={() => this.props.navigation.navigate('solicitar_n_senha')}>Obtenha ajuda para entrar.</Text></Text>
                </View>
                <View style={styles.footer}>
                    <Text>Não tem conta? <Text style={{color: 'blue'}, {fontWeight: "bold"}} onPress={() => this.props.navigation.navigate('cadastroUsuario')}>Cadastre-se!</Text></Text>
                </View>
            </View>
        )
    }

    login (navigation){
      api.get('/usuarios/getUsuariosByLogin', {
        params: {
          user: this.state.email,
          senha: this.state.senha
        }
      }).then(function (response) {
          // handle success
          if(response.data[0] === undefined){
            Alert.alert("Dados incorretos!");
          } else {
            navigation.navigate('Homepage');
          }
      })
        .catch(function (error) {
          // handle error
          console.log(error);
      })
        .then(function () {
          // always executed
      });
    }   
}

const styles = StyleSheet.create({
    logo: {
      width: 200,
      height: 30,
      alignSelf: "center",
      marginTop: 150
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
      marginTop: 80
    },
    button: {
      alignSelf: "center",
      marginTop: 20,
      width: 320
    },
    footer: {
      marginTop: 180,
      alignSelf: "center"
    }
});
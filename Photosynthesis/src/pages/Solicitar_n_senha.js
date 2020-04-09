import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class solicitar_n_senha extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
              
              
                <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white' onPress={() => Alert.alert('voltar')}>
                     <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                </TouchableHighlight>
                <View>
                    <Image source={require('../../assets/exclamation.png')} style={styles.excla}></Image>
                </View>
                <View style={styles.button}>
                    <Text style={styles.esqueceuSenha}>Esqueceu sua senha? </Text>
                    <Text style={styles.esqueceuSenhaText}>Faça a solicitação que redefinimos a senha para você..</Text>
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Solicitar nova senha"} onPress={() => Alert.alert('Método para solicitar nova senha')}/>
                </View>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    esqueceuSenha:{
      marginTop: 30,
      fontSize: 25,
      fontWeight: "bold",
      alignSelf: "center"
    },
    esqueceuSenhaText:{
      marginTop: -26,
      fontSize: 23,
      padding: 30,
      textAlign: "center"
    },
    excla: {
      width: 120,
      height: 120,
      marginTop: 80,
      alignSelf: "center",
      
    },
    back: {
      width: 30,
      height: 30,
      marginTop: 50,
      marginLeft: 20
    },
    logo: {
      width: 200,
      height: 30,
      alignSelf: "center",
      marginTop: 100
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
      marginTop: 75  
    },
    button: {
      alignSelf: "center",
      marginTop: 20,
      width: 320
    },
    footer: {
      marginTop: 220,
      alignSelf: "center"
    }
});
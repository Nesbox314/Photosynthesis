import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class cadastro_de_plantas extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
              
                <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white' onPress={() => Alert.alert('voltar')}>
                     <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                </TouchableHighlight>
                <View>
                    <Image source={require('../../assets/logo_add_planta.png')} style={styles.add_img}></Image>
                </View>
             
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nome"}/>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Espécie"}/>
                </View>

                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Cadastrar planta"} onPress={() => Alert.alert('Método para solicitar nova senha')}/>
                </View>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    TouchableHighlight:{
    width:100,
 
    },
    esqueceuSenha:{
      marginTop: 10,
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
    add_img: {
      width: 220,
      height: 220,
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
      padding: 10,
      marginTop: 25,
      height: 50,
      width: 320,
      borderRadius: 4
    },
    inputs: {
        marginTop: 20 
      },
    button: {
      alignSelf: "center",
      marginTop: 40,
      width: 320
    },
    footer: {
      marginTop: 220,
      alignSelf: "center"
    }
});
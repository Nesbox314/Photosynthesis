import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class nova_senha extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
              
              
                <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white'onPress={() => this.props.navigation.navigate('login')}>
                     <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                </TouchableHighlight>
                <View>
                    <Image source={require('../../assets/exclamation.png')} style={styles.excla}></Image>
                </View>
                <View style={styles.button}>
                    <Text style={styles.esqueceuSenha}>Solicitou nova senha? </Text>
                    <Text style={styles.esqueceuSenhaText}>Insira sua nova senha que nós redefiniremos para você.</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} secureTextEntry={true} pattern={[
                                                                                        '^.{8,}$', // min 8 chars
                                                                                        '(?=.*\\d)', // number required
                                                                                        '(?=.*[A-Z])', // uppercase letter 
                                                                                    ]}onValidation={isValid => this.setState({ isValid })} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nova senha"}/>
                    <TextInput style={styles.input} secureTextEntry={true} pattern={[
                                                                                        '^.{8,}$', // min 8 chars
                                                                                        '(?=.*\\d)', // number required
                                                                                        '(?=.*[A-Z])', // uppercase letter 
                                                                                    ]}onValidation={isValid => this.setState({ isValid })} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "confirmação da senha"}/>
                </View>

                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Solicitar nova senha"} onPress={() => this.props.navigation.navigate('')}/>
                </View>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
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
    excla: {
      width: 120,
      height: 120,
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
      pattern,
      padding: 10,
      marginTop: 10,
      height: 50,
      width: 320,
      borderRadius: 4
    },
    inputs: {
      marginTop:10


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
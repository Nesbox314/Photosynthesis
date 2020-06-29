import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Instrucoes extends Component {
  

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
                    <Text style={styles.Titulo}>Quase tudo pronto! </Text>
                    <Text style={styles.esqueceuSenhaText}>Prossiga com os próximos passos para iniciar seu monitoramento.</Text>
                    <Text style={styles.passo1}> 1 - Faça Download do arquivo no botão a baixo. </Text>
                    <Text style={styles.passo1}> 2 - Conecte o smartphone via USB na maquina conectada ao sensor. </Text>
                    <Text style={styles.passo1}> 3 - Faça a transferencia do arquivo para a maquina. </Text>
                    <Text style={styles.passo1}> 1 - De play no servidor. </Text>
                </View>

                <View style={styles.button2}>
                    <Button color={'rgb(146, 211, 110)'} title={"Download e prosseguir"} onPress={() => this.props.navigation.navigate('nova_senha')}/>
                </View>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    passo1:{
      marginTop: 5,
      fontSize: 15,
    },
    Titulo:{
      marginTop: 20,
      fontSize: 25,
      fontWeight: "bold",
      alignSelf: "center"
    },
    esqueceuSenhaText:{
      marginTop: 10,
      fontSize: 23,
      padding: 15,
      textAlign: "center"
    },
    excla: {
      width: 120,
      height: 120,
      marginTop: 0,
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
    button2: {
      alignSelf: "center",
      marginTop: 30,
      width: 320
    },
    footer: {
      marginTop: 220,
      alignSelf: "center"
    }
});
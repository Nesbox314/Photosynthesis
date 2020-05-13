import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert,TouchableHighlight } from "react-native";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';

export default class ConfirmaçãoMonitoring extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>


                <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white' onPress={() => this.props.navigation.navigate('Monitoramento')}>
                     <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                </TouchableHighlight>

                <View style={styles.tituloPrincipalContainer}>
                    <Text style={styles.tituloPrincipal} >Deseja monitorar esta planta?</Text>
                </View>

                <View style={styles.titulo_total}>
                    <Text style={styles.titulo}>Helianthus annus</Text>
                    <Text style={styles.titulo}>Girassol</Text>
                </View>
                <View>
                    <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                </View>
                <View style={styles.icons}>
                    <View style={styles.button}>
                        <Button color={'rgb(146, 211, 110)'} title={"Confirmar"} onPress={() => Alert.alert('confirmar')}/>
                    </View>
                </View>
            </View>
              
           
        )
    }
}

const styles = StyleSheet.create({

    TouchableHighlight:{
        width:100,
    },
    back: {
        width: 30,
        height: 30,
        marginTop: 50,
        marginLeft: 20
    },
    tituloPrincipalContainer:{
       // borderBottomWidth: 1,
       // borderBottomColor: '#DCDCDC',
    },
    tituloPrincipal:{
        marginTop: 25,
        paddingBottom:15,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold"
    },
    logosu:{
        height:100
    },
    nivel:{
        marginLeft:70,
        marginTop:-30,
        fontSize: 20
    },
    resposta:{
        marginLeft:200,
        marginTop:-25,
        fontSize: 20
    },
    L1: {
        marginTop: 5
    },
    L2: {
    },
    icon:{
        width: 50,
        height: 50,
        marginTop: 10
    },
    icons: {
        marginTop: 20,
        alignSelf: "center"
    },
    titulo_total: {
        marginTop: 15
    },
    titulo:{
        fontSize: 20,
        alignSelf: "center"
    },
    imagem: {
        marginTop: 30,
        height: 350,
        alignSelf: "center",
    },
    footer: {
        borderTopColor: "black",
        borderTopWidth: 1,
        marginTop: 15
    },
    tabNavigator: {
        bottom: 0
    },
    button: {
        alignSelf: "center",
        marginTop: 10,
        width: 320
      },
})


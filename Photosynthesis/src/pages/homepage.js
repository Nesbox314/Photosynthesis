/*import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Homepage extends Component {

    //----menu superior----

    static navigationOptions = {
        title: "Tela Inímcial",

            headerTitle: (
                <Image style={styles.imagem}source={require('../assets/do.png')}/>               
            ),
        
            headerStyle:{
                backgroundColor: "#ff00" ,
            },
        
             headerTintColor:"#ff0"
    };

    //----Corpo do projeto----

        render(){
        return (
            <View style={StyleSheet.container}>
                <Text style={styles.teste}>Taela isesal</Text>
                </View>
        )
    }
}

// ----estilização----
const styles = StyleSheet.create({

    teste: {
        fontSize: 20,
        textAlign: "center",
        //height: 10,
    },
    imagem: {
        marginTop:10,


    },
});*/


import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class Homepage extends Component {




    render(){
        console.log('Início da renderização da tela');
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View style={styles.titulo_total}>
                    <Text style={styles.titulo}>Planta</Text>
                    <Text style={styles.titulo}>Nome cientifico</Text>
                </View>
                <View>
                    <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                </View>
                <View style={styles.icons}>
                    <View style={styles.l1}>
                         <Image source={require('../../assets/sol.png')} style={styles.icon}></Image>
                         <Text style={styles.nivel}>Nivel de luz:</Text>
                         <Text style={styles.resposta}>Ruim</Text>
                    </View>
                    <View style={styles.l2}>
                        <Image source={require('../../assets/gota.png')} style={styles.icon}></Image>
                        <Text style={styles.nivel}>Nivel de água:</Text>
                        <Text style={styles.resposta}>Bom</Text>
                    </View>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
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
        marginTop: 100
    },
    titulo:{
        fontSize: 20,
        alignSelf: "center"
    },
    imagem: {
        marginTop: 30,
        height: 300,
        alignSelf: "center",
    },
    
})


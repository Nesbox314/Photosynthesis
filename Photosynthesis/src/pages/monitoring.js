




import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';

export default class Monitoring extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View>
                    <Header navigation={this.props.navigation}/>
                </View>
                <View style={styles.titulo_total}>
                    <Text style={styles.titulo}>Meus monitoramentos</Text>
                </View>
                <View>
                    <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                    <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                </View>
                
                <View style={styles.footer}>
                    <TabNavigator style={styles.tabNavigator} navigation={this.props.navigation}/>
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
    footer: {
       
        bottom:0
    },
    tabNavigator: {
        bottom: 0
    }
})


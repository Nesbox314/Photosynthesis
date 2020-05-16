import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert, ScrollView , TouchableOpacity, TouchableHighlight } from "react-native";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';

export default class Monitoring extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                
                <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white' onPress={() => this.props.navigation.navigate('Homepage')}>
                     <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                </TouchableHighlight>
                <View style={styles.tituloPrincipalContainer}>
                    <Text style={styles.tituloPrincipal} >Escolha qual monitorar</Text>
                </View>
                <View style={styles.aa}>
                    <ScrollView style={styles.scrollView}>
                        <TouchableOpacity activeOpacity={.100} style={styles.monitoramento}  onPress={() => this.props.navigation.navigate('ConfirmacaoMonitoring')}>
                            <View style={styles.tituloPlantasContainer}>
                                <Text style={styles.tituloPlantas} >Helianthus annus</Text>
                                <Text style={styles.tituloPlantas} >girassol</Text>
                            </View>  
                            <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                        </TouchableOpacity>
                
                        <TouchableOpacity activeOpacity={.100} style={styles.monitoramento}  onPress={() => this.props.navigation.navigate('ConfirmacaoMonitoring')} style={styles.monitoramento}>
                            <View style={styles.tituloPlantasContainer}>
                                <Text style={styles.tituloPlantas} >Helianthus annus</Text>
                                <Text style={styles.tituloPlantas} >girassol</Text>
                            </View>  
                            <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.100} style={styles.monitoramento}  onPress={() => this.props.navigation.navigate('ConfirmacaoMonitoring')} style={styles.monitoramento}>
                            <View style={styles.tituloPlantasContainer}>
                                <Text style={styles.tituloPlantas} >Helianthus annus</Text>
                                <Text style={styles.tituloPlantas} >girassol</Text>
                            </View>  
                            <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                        </TouchableOpacity>
                    </ScrollView>
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
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
    },
    tituloPrincipal:{
        marginTop: 10,
        paddingBottom:15,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold"
     
    },
    tituloPlantasContainer:{
        marginTop:20
    },
    tituloPlantas:{
        alignSelf: "center",
        fontSize: 17,
    },
    imagem: {
        height: 230,
        width: 450,
        alignSelf: "center",
        marginBottom: 8,
        marginTop:10
    },
    monitoramento: {
        
    },
    footer: {
        marginTop:-14,
         
    },
    
    scrollView:{
        marginHorizontal: 0,
        marginBottom:0,
      
    },
    
    tabNavigator: {
        bottom: 0,
        marginTop: 0
    },

    aa:{
        height:550,
    },
})


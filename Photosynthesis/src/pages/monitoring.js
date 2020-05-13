import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert, ScrollView , TouchableOpacity } from "react-native";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';

export default class Monitoring extends Component {

    render(){
        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View>
                    <Header navigation={this.props.navigation}/>
                </View>
                <View style={styles.tituloPrincipalContainer}>
                    <Text style={styles.tituloPrincipal} >Meus monitoramentos</Text>
                </View>
                <View style={styles.aa}>
                    <ScrollView style={styles.scrollView}>
                        <TouchableOpacity activeOpacity={.100} style={styles.monitoramento}  onPress={() => this.props.navigation.navigate('solicitar_n_senha')}>
                            <View style={styles.tituloPlantasContainer}>
                                <Text style={styles.tituloPlantas} >Helianthus annus</Text>
                                <Text style={styles.tituloPlantas} >girassol</Text>
                            </View>  
                            <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                        </TouchableOpacity>
                
                        <TouchableOpacity activeOpacity={.100} style={styles.monitoramento}  onPress={() => this.props.navigation.navigate('solicitar_n_senha')} style={styles.monitoramento}>
                            <View style={styles.tituloPlantasContainer}>
                                <Text style={styles.tituloPlantas} >Helianthus annus</Text>
                                <Text style={styles.tituloPlantas} >girassol</Text>
                            </View>  
                            <Image source={require('../../assets/girassol.jpg')} style={styles.imagem}></Image>
                        </TouchableOpacity>
                    </ScrollView>
                    </View>
                <View style={styles.footer}>
                    <TabNavigator style={styles.tabNavigator} navigation={this.props.navigation}/>
                </View>
            </View>   
        )
    }
}

const styles = StyleSheet.create({
   
    tituloPrincipalContainer:{
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
    },
    tituloPrincipal:{
        marginTop: 90,
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
        height: 200,
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
        height:500,
    },
})


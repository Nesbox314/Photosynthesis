import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";
import api from '../services/api';

export default class configuracaoDeMonitoramento extends Component {

    state = {
        plants: null,
        loading: true,
        length: null
    }

    componentDidMount() {
        api.get('/monitor/getMonitors').then(res => {
            this.setState({ plants: res.data, loading: false, length: res.data.length });
        });
    }

    render(){
        const { plants } = this.state;

        if (this.state.loading) {
            return false;
        }

        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                
                <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white' onPress={() => this.props.navigation.navigate('Homepage')}>
                     <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                </TouchableHighlight>
                <View style={styles.tituloPrincipalContainer}>
                    <Text style={styles.tituloPrincipal} >Configuração do monitoramento</Text>
                    <TouchableHighlight style={styles.addoncontainer} underlayColor='white' onPress={() => this.props.navigation.navigate('cadastroDePlantas')}>
                         <Image source={require('../../assets/addmon.png')} style={styles.addmon}></Image>
                    </TouchableHighlight>
                </View>
                <View style={styles.aa}>
                    <ScrollView style={styles.scrollView}>
                        {plants.map(plant => 
                        <View key={plant.id}>
                            <View style={styles.monitoramento}  onPress={() => this.props.navigation.navigate('cadastroDePlantas')}>
                                <View style={styles.tituloPlantasContainer}>
                                    <Text style={styles.tituloPlantas} >{plant.especie}</Text>
                                    <Text style={styles.tituloPlantas} >{plant.apelido}</Text>
                                    <TouchableHighlight style={styles.lixocontainer} underlayColor='white' onPress={() => this.props.navigation.navigate('ExcluirMonitoramento')}>
                                        <Image source={require('../../assets/can.png')} style={styles.lixo}></Image>
                                    </TouchableHighlight>
                                </View>  
                                <Image source={{ uri: 'data:image/jpeg;base64,' + plant.foto }} style={styles.imagem}></Image>
                            </View>
                        </View>
                        )}
                    </ScrollView>
                </View>
            </View>   
        )
    }
}

const styles = StyleSheet.create({

    lixocontainer:{
        marginTop:-35,
        marginLeft:30,
        marginRight:300,
        marginBottom:20
    },
    lixo:{
        width: 30,
        height: 30,
    },
    addoncontainer:{
    },
    addmon:{
        width: 60,
        height: 60,
        marginLeft: 150

    },
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
        marginTop:20,
      
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
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
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


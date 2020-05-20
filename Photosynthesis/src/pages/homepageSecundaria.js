import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, ScrollView, TouchableHighlight } from "react-native";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http:\\192.168.1.8:3000'
});

export default class HomepageSecunsari extends Component {

    state = {
        plants: null,
        loading: true
    }

    componentDidMount(){
        api.get('/monitor/getMonitors').then(res => { 
            this.setState({ plants: res.data, loading: false });
        });
    }

    render(){
        const { plants } = this.state;

        if ( this.state.loading ) {
            return false;
        }

        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>

                <View>
                    <Header navigation={this.props.navigation}/>
                </View>
                
                   <View style={styles.aa}>
                    <ScrollView style={styles.scrollView}>
                        {plants.map(plant => 
                        <View key={plant.id}>
                            <View activeOpacity={.100} style={styles.monitoramento}  onPress={() => this.props.navigation.navigate('ConfirmacaoMonitoring')}>
                                <View style={styles.tituloPlantasContainer}>
                                    <Text style={styles.tituloPlantas} >{plant.especie}</Text>
                                    <Text style={styles.tituloPlantas} >{plant.apelido}</Text>
                                </View>  
                                <Image source={{uri: 'data:image/jpeg;base64,' + plant.foto}} style={styles.imagem}></Image>
                                <View style={styles.l2}>
                                        <Text style={styles.nivel}>Nível de umidade:</Text>
                                        <Text style={styles.resposta}>Ruim</Text>
                                        <Image source={require('../../assets/gota.png')} style={styles.icon}></Image>
                                </View>
                            </View>
                        </View>
                        )}

                        <TouchableHighlight style={styles.gearcontainer} underlayColor='white' onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
                            <Image source={require('../../assets/gear.png')} style={styles.gear}></Image>
                        </TouchableHighlight>
                    </ScrollView>
                    <View>
                    <TabNavigator style={styles.tabNavigator} navigation={this.props.navigation}/>
                </View>
                    </View>
                
            </View>   
        )
    }
}

const styles = StyleSheet.create({

    gearcontainer:{
        marginLeft:-10,
        marginTop:-60
    },
    gear:{
        marginTop: 0,
        height: 55,
        width: 55,
        marginLeft:0
    },
    nivel:{
        marginLeft:35,
        marginTop:-60,
        fontSize: 22
    },
    resposta:{
        marginLeft:100,
        marginTop:0,
        fontSize: 22,
        marginBottom:5
    },
    icon:{
        width: 30,
        height: 30,
        marginLeft: 60,
        marginTop: -30,
        marginBottom:10
    },
    L1: {
        marginTop: 5
    },
    l2: {
        marginTop: 55,
        paddingLeft: 60,
        borderBottomWidth: 1,
        borderColor: '#DCDCDC',
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
        marginTop:70,
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
        marginTop:70
    },
})



import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert, TouchableHighlight } from "react-native";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http:\\192.168.1.8:3000'
});

export default class Homepage extends Component {

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

        if (this.state.loading) {
            return false;
        }

        if (plants[0] == null || plants[0] == undefined) {
            return (
                <View>
                    <Header></Header>
                    <View style={{marginTop: 330, alignSelf: "center"}}>
                        <Text>Não há nenhuma planta a ser monitorada!</Text>
                        <Text>Deseja monitorar?</Text><Text onPress={() => this.props.navigation.navigate('cadastroDePlantas')}>Clique aqui!</Text>
                    </View>
                </View>
            )
        }

        return (
            <View style={{flex: 1,backgroundColor: 'white'}}>
                <View>
                    <Header navigation={this.props.navigation}/>
                </View>
                <View style={styles.titulo_total}>
                    <Text style={styles.titulo}>{plants[0].apelido}</Text>
                    <Text style={styles.titulo}>{plants[0].especie}</Text>
                </View>
                <View>
                    <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + plants[0].foto}} />
                </View>
                <View style={styles.icons}>
                    <View style={styles.l2}>
                        <TouchableHighlight style={styles.gearcontainer} underlayColor='white' onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
                            <Image source={require('../../assets/gear.png')} style={styles.gear}></Image>
                        </TouchableHighlight>
                        <Text style={styles.nivel}>Nível de humidade:</Text>
                        <Text style={styles.resposta}>Ruim</Text>
                        <Image source={require('../../assets/gota.png')} style={styles.icon}></Image>
                    </View>
                </View>
                <View>
                    <TabNavigator style={styles.tabNavigator} navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    gearcontainer:{
        marginLeft:-50,
        
    },
    gear:{
        marginTop: 10,
        height: 55,
        width: 55,
        marginLeft:0
    },
    logosu:{
        height:100
    },
    nivel:{
        marginLeft:35,
        marginTop:-60,
        fontSize: 22
    },
    resposta:{
        marginLeft:100,
        marginTop:0,
        fontSize: 22
    },
    icon:{
        width: 30,
        height: 30,
        marginLeft: 60,
        marginTop: -25
    },
    L1: {
        marginTop: 5
    },
    L2: {
        marginTop: 35
    },
    icons: {
        marginTop: 40,
        alignSelf: "center",
        marginBottom: 30
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
        borderTopColor: "black",
        borderTopWidth: 1,
        marginTop: 15
    },
    tabNavigator: {
        bottom: 0
    },
    image: {
        marginTop: 10,
        height: 320,
        width: 360,
        alignSelf: "center"
    }
})


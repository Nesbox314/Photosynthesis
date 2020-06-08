import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, TouchableHighlight, ScrollView } from "react-native";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';
import api from '../services/api';

export default class Homepage extends Component {

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

    render() {
        const { plants } = this.state;

        if (this.state.loading) {
            return false;
        }

        console.log(this.state.length);
        if (plants[0] == null || plants[0] == undefined) {
            return (
                <View>
                    <Header></Header>
                    <View style={{ marginTop: 330, marginBottom: 235, alignSelf: "center" }}>
                        <Text>Não há nenhuma planta a ser monitorada!</Text>
                        <Text>Deseja monitorar?</Text><Text onPress={() => this.props.navigation.navigate('cadastroDePlantas')}>Clique aqui!</Text>
                    </View>
                    <TabNavigator navigation={this.props.navigation}></TabNavigator>
                </View>
            )
        }

        if (this.state.length == 1) {
            return (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View>
                        <Header navigation={this.props.navigation} />
                    </View>
                    <View style={styles.titulo_total}>
                                 <TouchableHighlight style={styles.gearcontainer} underlayColor='white' onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
                                    <Image source={require('../../assets/mais.png')} style={styles.gear}></Image>
                                </TouchableHighlight> 
                        <Text style={styles.titulo}>{plants[0].apelido}</Text>
                        <Text style={styles.titulo}>{plants[0].especie}</Text>
                    </View>
                    <View>
                        <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,' + plants[0].foto }} />
                    </View>
                    <View style={styles.icons}>
                        <View style={styles.l2}>
                            <Text style={styles.nivel}>Nível de umidade:</Text>
                            <Text style={styles.resposta}>Ruim</Text>
                            <Image source={require('../../assets/gota.png')} style={styles.icon}></Image>
                        </View>
                    </View>
                    <View>
                        <TabNavigator style={styles.tabNavigator} navigation={this.props.navigation} />
                    </View>
                </View>
            )
        }

        if (this.state.length > 1) {
            return (
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    <View>
                        <Header navigation={this.props.navigation} />
                    </View>

                    <View style={stylesSecond.aa}>
                        <ScrollView style={stylesSecond.scrollView}>
                            {plants.map(plant =>
                                <View key={plant.id}>
                                    <View activeOpacity={.100} style={stylesSecond.monitoramento} onPress={() => this.props.navigation.navigate('ConfirmacaoMonitoring')}>
                                        <View style={stylesSecond.tituloPlantasContainer}>
                                            <TouchableHighlight style={styles.gearcontainer} underlayColor='white' onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
                                                   <Image source={require('../../assets/mais.png')} style={styles.gear}></Image>
                                            </TouchableHighlight> 
                                            <Text style={stylesSecond.tituloPlantas} >{plant.especie}</Text>
                                            <Text style={stylesSecond.tituloPlantas} >{plant.apelido}</Text>
                                        </View>
                                        <Image source={{ uri: 'data:image/jpeg;base64,' + plant.foto }} style={stylesSecond.imagem}></Image>
                                        <View style={stylesSecond.l2}>
                                            <Text style={stylesSecond.nivel}>Nível de umidade:</Text>
                                            <Text style={stylesSecond.resposta}>Ruim</Text>
                                            <Image source={require('../../assets/gota.png')} style={stylesSecond.icon}></Image>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                        <View style={styles.tabNavigator}>
                            <TabNavigator style={styles.Navigtor} navigation={this.props.navigation}/>
                        </View>
                    </View>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    gearcontainer:{
        marginLeft:305,
        marginBottom:-40,       
    },
    gear:{
        
        height: 20,
        width: 20,
    },
    logosu: {
        height: 100
    },
    nivel: {
        marginLeft: 35,
        marginTop: -60,
        fontSize: 22
    },
    resposta: {
        marginLeft: 100,
        marginTop: 0,
        fontSize: 22
    },
    icon: {
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
    titulo: {
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
        position: "absolute",
        zIndex: 15,
        width: 360,
        bottom: 0 
    },
    image: {
        marginTop: 10,
        height: 320,
        width: 360,
        alignSelf: "center"
    }
})

const stylesSecond = StyleSheet.create({

    gearcontainer:{
        marginLeft:305,
        marginBottom:-40,       
    },
    gear:{
        
        height: 20,
        width: 20,
    },
    nivel: {
        marginLeft: 35,
        marginTop: -50,
        fontSize: 22
    },
    resposta: {
        marginLeft: 100,
        marginTop: 5,
        fontSize: 22,
        marginBottom: 5
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 60,
        marginTop: -35,
        marginBottom: 15
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

    TouchableHighlight: {
        width: 100,
    },
    back: {
        width: 30,
        height: 30,
        marginTop: 50,
        marginLeft: 20
    },
    tituloPrincipalContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        marginTop: 70,
    },
    tituloPrincipal: {
        marginTop: 10,
        paddingBottom: 15,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold"

    },
    tituloPlantasContainer: {
        marginTop: 20
    },
    tituloPlantas: {
        alignSelf: "center",
        fontSize: 17,
    },
    imagem: {
        height: 230,
        width: 450,
        alignSelf: "center",
        marginBottom: 8,
        marginTop: 10
    },
    monitoramento: {
        marginTop:20  
    },
    footer: {
        marginTop: -14,

    },

    scrollView: {
        marginHorizontal: 0,
        marginBottom: 0,

    },

    tabNavigator: {
        position: "absolute",
        zIndex: 15,
        width: 360,
        bottom: 50 
    },

    aa: {
        height: 550,
        marginTop: 70
    },
})


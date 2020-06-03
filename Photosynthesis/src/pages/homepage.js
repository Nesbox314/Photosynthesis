import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, TouchableHighlight, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import { PullToRefreshView } from "react-native-smooth-pull-to-refresh";
import Header from './component/header';
import TabNavigator from './component/tabNavigator';
import api from '../services/api';

export default class Homepage extends Component {

    state = {
        title: "Pull down to refresh",
        isRefreshing: false,
        plants: null,
        loading: true,
        loadingAnimation: null,
        length: null,
        userId: null
    };

    render() {
        const { plants } = this.state;

        if (this.state.loading) {
            return false;
        }

        if (plants.length == 0) {
            return (
                <View style={styles.viewPrincipal}>
                    <View style={{ height: 75 }}>
                        <Header></Header>
                    </View>
                    <PullToRefreshView
                        minPullDistance={50}
                        pullAnimHeight={50}
                        pullAnimYValues={{ from: -50, to: 10 }}
                        isRefreshing={this.state.isRefreshing}
                        onRefresh={this.onInnerRefresh}
                        onTriggerToRefresh={this.onTriggerToRefresh}
                        contentComponent={
                            <View>
                                <View style={{ marginTop: 330, marginBottom: 235, alignSelf: "center" }}>
                                    <Text>Não há nenhuma planta a ser monitorada!</Text>
                                    <Text>Deseja monitorar?</Text><Text onPress={() => this.props.navigation.navigate('cadastroDePlantas')}>Clique aqui!</Text>
                                </View>
                                <View style={styles.tabNavigator}>
                                    <TabNavigator navigation={this.props.navigation}></TabNavigator>
                                </View>
                            </View>
                        }
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "green", fontSize: 20, marginTop: 5, marginLeft: 80, marginRight: 10 }}>{this.state.title}</Text><Image style={{ height: 30, width: 30, marginTop: 5 }} source={this.state.loadingAnimation} />
                        </View>

                    </PullToRefreshView>
                    <View style={styles.tabNavigator}>
                        <TabNavigator navigation={this.props.navigation}></TabNavigator>
                    </View>
                </View>
            )
        }

        if (plants.length == 1) {
            return (
                <View style={styles.viewPrincipal}>
                    <View style={{ height: 75 }}>
                        <Header></Header>
                    </View>
                    <PullToRefreshView
                        minPullDistance={50}
                        pullAnimHeight={50}
                        pullAnimYValues={{ from: -50, to: 10 }}
                        isRefreshing={this.state.isRefreshing}
                        onRefresh={this.onInnerRefresh}
                        onTriggerToRefresh={this.onTriggerToRefresh}
                        contentComponent={
                            <View style={{ flex: 1, backgroundColor: 'white' }}>
                                <View style={styles.titulo_total}>
                                    <Text style={styles.titulo}>{plants[0].apelido}</Text>
                                    <Text style={styles.titulo}>{plants[0].especie}</Text>
                                </View>
                                <View>
                                    <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,' + plants[0].foto }} />
                                </View>
                                <View style={styles.icons}>
                                    <View style={styles.l2}>
                                        <TouchableHighlight style={styles.gearcontainer} underlayColor='white' onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
                                            <Image source={require('../../assets/gear.png')} style={styles.gear}></Image>
                                        </TouchableHighlight>
                                        <Text style={styles.nivel}>Nível de umidade:</Text>
                                        <Text style={styles.resposta}>Ruim</Text>
                                        <Image source={require('../../assets/gota.png')} style={styles.icon}></Image>
                                    </View>
                                </View>
                            </View>
                        }
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "green", fontSize: 20, marginTop: 5, marginLeft: 80, marginRight: 10 }}>{this.state.title}</Text><Image style={{ height: 30, width: 30, marginTop: 5 }} source={this.state.loadingAnimation} />
                        </View>

                    </PullToRefreshView>
                    <View style={styles.tabNavigator}>
                        <TabNavigator navigation={this.props.navigation}></TabNavigator>
                    </View>
                </View>
            )
        }

        if (plants.length > 1) {
            return (
                <View style={styles.viewPrincipal}>
                    <View style={{ height: 75 }}>
                        <Header></Header>
                    </View>
                    <PullToRefreshView
                        minPullDistance={50}
                        pullAnimHeight={50}
                        pullAnimYValues={{ from: -50, to: 10 }}
                        isRefreshing={this.state.isRefreshing}
                        onRefresh={this.onInnerRefresh}
                        onTriggerToRefresh={this.onTriggerToRefresh}
                        contentComponent={
                            <View style={stylesSecond.aa}>
                                <ScrollView style={stylesSecond.scrollView}>
                                    {plants.map(plant =>
                                        <View key={plant.id}>
                                            <View activeOpacity={.100} style={stylesSecond.monitoramento} onPress={() => this.props.navigation.navigate('ConfirmacaoMonitoring')}>
                                                <View style={stylesSecond.tituloPlantasContainer}>
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
                            </View>
                        }
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "green", fontSize: 20, marginTop: 5, marginLeft: 80, marginRight: 10 }}>{this.state.title}</Text><Image style={{ height: 30, width: 30, marginTop: 5 }} source={this.state.loadingAnimation} />
                        </View>

                    </PullToRefreshView>
                    <View style={styles.touch}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
                            <Image style={styles.add} source={require('../../assets/addmon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabNavigator}>
                        <TabNavigator navigation={this.props.navigation}></TabNavigator>
                    </View>
                </View>
            )
        }
    }

    onInnerRefresh = () => {
        this.setState({ title: "Carregando..." });
        this.setState({ loadingAnimation: require('../../assets/loading.gif') });
        this.startRefreshing();
    }

    onTriggerToRefresh = (triggered) => {
        this.setState({ title: triggered ? "Solte para recarregar" : "Puxe para baixo para recarregar" });
    }

    startRefreshing = () => {
        this.setState({ isRefreshing: true });
        setTimeout(() => {
            api.get('/monitor/getMonitors', {
                params: { user: this.state.userId }
            }).then(res => {
                this.setState({ plants: res.data, loading: false, isRefreshing: false, loadingAnimation: null });
            });
        }, 1500);
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        this.setState({ userId: await AsyncStorage.getItem('idUser')})
        api.get('/monitor/getMonitors', {
            params: { user: await AsyncStorage.getItem('idUser') }
        }).then(res => {
            this.setState({ plants: res.data, loading: false, length: res.data.length });
        })
    }
}

const styles = StyleSheet.create({
    add: {
        height: 60,
        width: 60,
        borderRadius: 200,
        zIndex: 20
    },
    touch: {
        position: "absolute",
        zIndex: 10,
        top: 550,
        right: 25
    },
    viewPrincipal: {
        marginTop: 0,
        flex: 1,
        zIndex: 1000
    },
    gearcontainer: {
        marginLeft: -50,
    },
    gear: {
        marginTop: 10,
        height: 55,
        width: 55,
        marginLeft: 0
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
        marginTop: 35
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
        bottom: 70
    },
    image: {
        marginTop: 10,
        height: 320,
        width: 360,
        alignSelf: "center"
    }
})

const stylesSecond = StyleSheet.create({
    gearcontainer: {
        position: "absolute",
    },
    gear: {
        marginTop: 0,
        height: 55,
        width: 55,
        marginLeft: 0
    },
    nivel: {
        marginLeft: 35,
        marginTop: -60,
        fontSize: 22
    },
    resposta: {
        marginLeft: 100,
        marginTop: 0,
        fontSize: 22,
        marginBottom: 5
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 60,
        marginTop: -30,
        marginBottom: 10
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
    scrollView: {
        marginHorizontal: 0,
        marginBottom: 0
    },
    tabNavigator: {
        bottom: 0,
        marginTop: 0
    },
    aa: {
    }
})


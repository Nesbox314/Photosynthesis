import { PullToRefreshView } from "react-native-smooth-pull-to-refresh";
import { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, AsyncStorage } from "react-native";
import React from 'react';
import Header from "./component/header";
import api from '../services/api';
import TabNavigator from './component/tabNavigator';

export class Social extends Component {

    state = {
        title: "Pull down to refresh",
        isRefreshing: false,
        plants: null,
        loading: true,
        loadingAnimation: null
    };

    componentDidMount() {
        api.get('/social/getTodosPlantWithUserData').then(res => {
            this.setState({ plants: res.data, loading: false });
        });
    }

    render() {
        const { plants } = this.state;

        if (this.state.loading) {
            return false;
        }

        if (plants[0] == undefined) {
            return (
                <View style={styles.viewPrincipal}>
                    <View style={{ height: 75, backgroundColor: "red" }}>
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
                            <ScrollView style={{ top: 10 }}>
                                <View style={styles.encapsulamentoVazio}>
                                    <Text>Que pena....</Text>
                                    <Text>Não há nenhuma postagem até o momento...</Text>
                                    <Text>Clique no botão abaixo para iniciar!</Text>
                                </View>
                            </ScrollView>
                        }
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: "green", fontSize: 20, marginTop: 5, marginLeft: 80, marginRight: 10 }}>{this.state.title}</Text><Image style={{ height: 30, width: 30, marginTop: 5 }} source={this.state.loadingAnimation} />
                        </View>

                    </PullToRefreshView>
                    <View style={styles.touch}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NovaPostagem')}>
                            <Image style={styles.add} source={require('../../assets/addmon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabNavigator}>
                        <TabNavigator navigation={this.props.navigation}></TabNavigator>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.viewPrincipal}>
                <View style={{ height: 75, backgroundColor: "red" }}>
                    <Header navigation={this.props.navigation}></Header>
                </View>
                <PullToRefreshView
                    minPullDistance={50}
                    pullAnimHeight={50}
                    pullAnimYValues={{ from: -50, to: 10 }}
                    isRefreshing={this.state.isRefreshing}
                    onRefresh={this.onInnerRefresh}
                    onTriggerToRefresh={this.onTriggerToRefresh}
                    contentComponent={
                        <ScrollView style={{ top: 10 }}>
                            <View style={styles.encapsulamento}>
                                {plants.map(plant =>
                                    <View key={plant.id} style={styles.borderPhoto}>
                                        <View style={styles.cabecalho}>
                                            <View style={{ flex: 1 }}>
                                                {plant.fotoUsuario == "null" && <Image source={require('../../assets/user.png')} style={styles.patternUser} />}
                                                {plant.fotoUsuario && <Image source={{ uri: 'data:image/jpeg;base64,' + plant.fotoUsuario }} style={styles.user} />}
                                            </View>
                                            <View style={{ flex: 7 }}>
                                                <Text>{plant.nomeUsuario}</Text>
                                                <Text>{plant.nomePlanta}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            {plant.foto && <Image style={styles.image} source={{ uri: plant.foto }} />}
                                            {!plant.foto && <Image style={styles.image} source={{ uri: plant.foto }} />}
                                        </View>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    }
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "green", fontSize: 20, marginTop: 5, marginLeft: 80, marginRight: 10 }}>{this.state.title}</Text><Image style={{ height: 30, width: 30, marginTop: 5 }} source={this.state.loadingAnimation} />
                    </View>

                </PullToRefreshView>
                <View style={styles.touch}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NovaPostagem')}>
                        <Image style={styles.add} source={require('../../assets/addmon.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabNavigator}>
                    <TabNavigator navigation={this.props.navigation}></TabNavigator>
                </View>
            </View >
        );
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
        this.setState({
            isRefreshing: true,
        });
        setTimeout(() => {
            api.get('/social/getTodosPlantWithUserData').then(res => {
                this.setState({ plants: res.data, loading: false, isRefreshing: false, loadingAnimation: null });
            });
        }, 1000);
    }
}

const styles = StyleSheet.create({
    viewPrincipal: {
        marginTop: 0,
        flex: 1,
        zIndex: 1000
    },
    views: {
        marginTop: 10,
        backgroundColor: "gray"
    },
    borderPhoto: {
        borderColor: "gray",
        borderWidth: 0.5
    },
    image: {
        width: 360,
        height: 240,
        alignSelf: "center"
    },
    encapsulamento: {
        marginTop: 0
    },
    encapsulamentoVazio: {
        marginTop: 250,
        marginLeft: 40
    },
    patternUser: {
        height: 33,
        width: 33,
        marginBottom: -30,
        marginLeft: 7,
        marginTop: 3,
    },
    user: {
        height: 33,
        width: 33,
        marginLeft: 7,
        marginTop: 3,
        borderRadius: 200
    },
    cabecalho: {
        flexDirection: "row"
    },
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
    tabNavigator: {
        position: "absolute",
        zIndex: 15,
        width: 360,
        bottom: 70
    }
})
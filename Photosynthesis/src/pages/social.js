import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import Header from "./component/header";
import api from '../services/api';
import TabNavigator from "./component/tabNavigator";

export default class Social extends Component {

    state = {
        plants: null,
        loading: true
    }

    componentDidMount() {
        api.get('/social/getTodosPlant').then(res => {
            this.setState({ plants: res.data, loading: false });
        });
    }

    render() {
        const { plants } = this.state;

        if (this.state.loading) {
            return false;
        }

        return (
            <View>
                <Header></Header>
                <View style={styles.view}>
                    <ScrollView>
                    <View style={styles.encapsulamento}>
                        {plants.map(plant =>
                            <View key={plant.id} style={styles.borderPhoto}>
                                <View style={styles.cabecalho}>
                                    <View style={{flex: 1}}>
                                        <Image style={styles.user} source={require('../../assets/user.png')}></Image>
                                    </View>
                                    <View style={{flex: 7}}>
                                        <Text>Nome do usuário</Text>
                                        <Text>{plant.nomePlanta}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,' + plant.foto }} />
                                </View>
                            </View>
                        )}
                    </View>
                    </ScrollView>
                    <View style={styles.touch}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('NovaPostagem')}>
                            <Image style={styles.add} source={require('../../assets/addmon.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tabNavigator}>
                        <TabNavigator navigation={this.props.navigation}></TabNavigator>
                    </View>
                </View>
            </View>
        )
    }
}
    
const styles = StyleSheet.create({
    view: {
        marginTop: 70
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
        marginTop: 6
    },
    user: {
        height: 33,
        width: 33,
        marginLeft: 7,
        marginTop: 3
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
        top: 480,
        right: 15
    },
    tabNavigator: {
        position: "absolute",
        zIndex: 15,
        width: 360,
        bottom: 70
    }
})

import React from 'react';
import { Component } from 'react';
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Header extends Component {

    render() {
        return (
            <View style={styles.viewPrincipal}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../../../assets/logo.png')} style={styles.imagem}></Image>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('PerfilUsuario')}>
                            <Image source={require('../../../assets/user.png')} style={styles.user}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 75,
        backgroundColor: 'rgb(247, 246, 246)',
        flexDirection: "row"
    },
    imagem: {
        marginTop: 36,
        width: 140,
        height: 25,
        marginLeft: 5
    }, user: {
        marginTop: 30,
        marginLeft: 120
    }
})
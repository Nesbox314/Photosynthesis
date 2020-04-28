import React from 'react';
import { Component } from 'react';
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class TabNavigator extends Component {

    render() {
        return (
            <View style={styles.viewPrincipal}>
                <View style={styles.footer}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Homepage')}>
                            <Image source={require('../../../assets/home.png')} style={styles.user}></Image>
                            <Text style={styles.legendaHome}>Home</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Monitoramento')}>
                            <Image source={require('../../../assets/folha.png')} style={styles.user}></Image>
                            <Text style={styles.legendaMonitoring}>Monitoramento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewPrincipal: {
        marginTop: 15,
        flex: 1,
        backgroundColor: 'white',
        bottom: 0
    },
    footer: {
        bottom: 0,
        height: 55,
        backgroundColor: 'rgb(247, 246, 246)',
        flexDirection: "row"
    },
    user: {
        marginTop: 2,
        marginLeft: 80
    },
    legendaHome: {
        marginLeft: 85,
        fontSize: 10
    },
    legendaMonitoring: {
        marginLeft: 70,
        fontSize: 10
    }
})
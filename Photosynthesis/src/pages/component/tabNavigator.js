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
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('HomepageSelect')}>
                            <Image source={require('../../../assets/folha.png')} style={styles.imageMonitoramento}></Image>
                            <Text style={styles.legendaHome}>Monitoramento</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Social')}>
                            <Image source={require('../../../assets/social.png')} style={styles.imageHome}></Image>
                            <Text style={styles.legendaMonitoring}>Social</Text>
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
    footer: {
        justifyContent: 'flex-end', 
        backgroundColor: 'rgb(247, 246, 246)',
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: '#DCDCDC',
        position: "absolute",
        bottom: -70
    },
    imageMonitoramento:{
        marginTop: 8,
        marginLeft: 88,
        height:30,
        width:30
    },
    imageHome:{
        marginTop: 8,
        marginLeft: 70,
        height:30,
        width:30
    },
    
    legendaHome: {
        marginLeft: 68,
        fontSize: 10
    },
    legendaMonitoring: {
        marginLeft: 70,
        fontSize: 10
    },
    user: {
        
        marginLeft: 100,
        height:33,
        width:33
    }
})
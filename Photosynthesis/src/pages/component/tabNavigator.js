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
<<<<<<< Updated upstream
                            <Image source={require('../../../assets/home.png')} style={styles.imageHome}></Image>
                            <Text style={styles.legendaHome}>Home</Text>
=======
                            <Image source={require('../../../assets/folha.png')} style={styles.user}></Image>
                            <Text style={styles.legendaHome}>Monitoramento</Text>
>>>>>>> Stashed changes
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Monitoramento')}>
<<<<<<< Updated upstream
                            <Image source={require('../../../assets/folha.png')} style={styles.imageMonitoramento}></Image>
                            <Text style={styles.legendaMonitoring}>Monitoramento</Text>
=======
                            <Image source={require('../../../assets/social.png')} style={styles.user}></Image>
                            <Text style={styles.legendaMonitoring}>Social</Text>
>>>>>>> Stashed changes
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
        
<<<<<<< Updated upstream
=======
        justifyContent: 'flex-end', 
>>>>>>> Stashed changes
        height: 55,
        backgroundColor: 'rgb(247, 246, 246)',
        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: '#DCDCDC',
       
        
    },

    imageMonitoramento:{
        marginTop: 8,
        marginLeft: 68,
        height:30,
        width:30
    },
    imageHome:{
        marginTop: 8,
        marginLeft: 83,
        height:30,
        width:30
    },
    

    legendaHome: {
        marginLeft: 85,
        fontSize: 10
    },
    legendaMonitoring: {
        marginLeft: 50,
        fontSize: 10
    }
})
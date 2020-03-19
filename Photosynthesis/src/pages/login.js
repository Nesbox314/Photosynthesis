import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { getOrientationAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';

export default class Login extends Component {

    render(){
        return (
            <View>
                <Image source={require('../../assets/logo.png')} style={styles.logo}></Image>
                <TextInput style={styles.input}/>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    logo: {
      width: 200,
      height: 30,
      alignSelf: "center",
      marginTop: 100
    },
    input: {
      borderColor: '#f0f',
      borderWidth: 1,
      marginTop: 20,
      height: 50
    }
});
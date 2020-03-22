import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Homepage extends Component {

    //----menu superior----

    static navigationOptions = {
        title: "Tela Inímcial",

            headerTitle: (
                <Image style={styles.imagem}source={require('../assets/do.png')}/>               
            ),
        
            headerStyle:{
                backgroundColor: "#ff00" ,
            },
        
             headerTintColor:"#ff0"
    };

    //----Corpo do projeto----

        render(){
        return (
            <View style={StyleSheet.container}>
                <Text style={styles.teste}>Taela isesal</Text>
                </View>
        )
    }
}

// ----estilização----
const styles = StyleSheet.create({

    teste: {
        fontSize: 20,
        textAlign: "center",
        //height: 10,
    },
    imagem: {
        marginTop:10,


    },
});
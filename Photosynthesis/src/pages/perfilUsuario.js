import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const api = axios.create({
    baseURL: 'http:\\192.168.0.12:3000'
});

export default class PerfilUsuario extends Component {

    state = {
        image: null
    };

    render() {
        let { image } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Homepage')}>
                        <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={.5} >
                    {!image && <Image source={require('../../assets/userPhoto.png')} style={styles.logo}></Image>}
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, borderRadius: 200 }} />}
                </View>
                <View style={styles.inputs}>
                    <Text style={styles.text}>josefino Jeremias </Text>
                    <Text style={styles.text}>Joserfo@email.com.br </Text>
                    <Text style={styles.text}>************** </Text>
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Editar perfil"}onPress={() => this.props.navigation.navigate('editarPerfilUsuario')}/>
                </View>
            </View>
        )
    }

  
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
            this.state.image = result;
        } catch (E) {
            console.log(E);
        }
    };
}

const styles = StyleSheet.create({
    back: {
        height: 35,
        width: 35,
        marginTop: 25,
        marginLeft: 3
    },
    logo: {
        height: 250,
        width: 250,
        alignSelf: "center"
    },
    text: {
        alignSelf: "center",
        backgroundColor: 'rgb(247, 246, 246)',
        borderColor: 'rgb(242, 241, 241)',
        borderWidth: 1,
        marginTop: 10,
        height: 50,
        width: 320,
        borderRadius: 4,
        paddingTop:15,
        paddingLeft:5

    },
    inputs: {
        marginTop: 40
    },
    button: {
        alignSelf: "center",
        marginTop: 20,
        width: 320
    },
    back: {
        width: 30,
        height: 30,
        marginTop: 50,
        marginLeft: 20
      },
})

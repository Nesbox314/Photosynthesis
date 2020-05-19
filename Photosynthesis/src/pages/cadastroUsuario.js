import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert } from "react-native";
//import api from '../services/api';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const api = axios.create({
    baseURL: 'http:\\192.168.0.12:3000'
});

export default class CadastroUsuario extends Component {

    state = {
        image: null
    };

    submit() {

        api.post('/usuarios/postUsuarios', {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            foto: this.state.image
        }).then(function (response) {
            Alert.alert("Cadastrado com sucesso!");
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let { image } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
               
                <View>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('login')}>
                        <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImage()}>
                    {!image && <Image source={require('../../assets/userPhoto.png')} style={styles.logo}></Image>}
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, borderRadius: 200 }} />}
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nome"} onChangeText={(nome) => this.setState({ nome })} />
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "E-mail"} onChangeText={(email) => this.setState({ email })} />
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Senha"} onChangeText={(senha) => this.setState({ senha })} />
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Confirmar senha"} />
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Cadastrar"} onPress={() => this.submit()} />
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Desculpe, precisamos da permissão para acesso a câmera!');
            }
        }
    };

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
    input: {
        alignSelf: "center",
        backgroundColor: 'rgb(247, 246, 246)',
        borderColor: 'rgb(242, 241, 241)',
        borderWidth: 1,
        marginTop: 10,
        height: 50,
        width: 320,
        borderRadius: 4
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

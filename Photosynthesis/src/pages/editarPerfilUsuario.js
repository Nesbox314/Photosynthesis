import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert, AsyncStorage } from "react-native";
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';

export default class editarPerfilUsuario extends Component {

    state = {
        image: null,
        userData: null,
        loading: true
    };

    constructor() {
        super();
        this.getData();
    }

    async getData() {
        api.get('/usuarios/getUserDate', {
            params: {
                id: await AsyncStorage.getItem('idUser')
            }
        }).then(res => {
            this.setState({ userData: res.data, loading: false, image: res.data[0].foto });
        });
    }

    submit() {
        api.get('/usuarios/editUser', {
            params: {
                id: this.state.userData[0].id,
                nome: this.refs.nome._lastNativeText,
                email: this.refs.email._lastNativeText,
                senha: this.refs.senha._lastNativeText
            }
        }).then(function (response) {
            Alert.alert("Cadastrado com sucesso!");
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let { userData, image } = this.state;

        if (this.state.loading) {
            return false;
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('Homepage')}>
                        <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImage()}>
                        {!image && <Image source={require('../../assets/userPhoto.png')} style={styles.logo}></Image>}
                    </TouchableOpacity>
                    {image && <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={{ width: 250, height: 250, borderRadius: 200 }} />}
                </View>
                <View style={styles.inputs}>
                    <TextInput ref='nome' style={styles.input} placeholderTextColor={"black"} placeholder={"O nome cadastrado era '" + userData[0].nome + "'."} />
                    <TextInput ref='email' style={styles.input} placeholderTextColor={"black"} placeholder={"O e-mail cadastrado era '" + userData[0].email + "'."} />
                    <TextInput ref='senha' style={styles.input} placeholderTextColor={"black"} placeholder={"O e-mail cadastrado era '" + userData[0].senha + "'."} />
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Confirmar senha"} />
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Concluir edição"} onPress={() => this.submit()} />
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

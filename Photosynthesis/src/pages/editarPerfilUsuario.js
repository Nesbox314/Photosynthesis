import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert, AsyncStorage } from "react-native";
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';
import ValidationComponent from 'react-native-form-validator';

export default class editarPerfilUsuario extends ValidationComponent {

    constructor(props) {
        super(props);
        this.deviceLocale = "ptBR";
        this.state = { nome: "", email: "", senha: "", image: null, loading: true, userData: null };
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

    validation(navigation) {
        this.validate({
            nome: { minlength: 3, maxlength: 100, required: true },
            email: { email: true, required: true, minlength: 3 },
            senha: { required: true },
        });

        if (this.isFormValid()) {
            this.submit(navigation);
        }
    }

    submit(navigation) {
        api.post('/usuarios/editUser', {
            id: this.state.userData[0].id,
            nome: this.refs.nome._lastNativeText,
            email: this.refs.email._lastNativeText,
            senha: this.refs.senha._lastNativeText,
            foto: this.state.image
        }).then(function (response) {
            Alert.alert("Cadastrado com sucesso!");
            navigation.navigate('Homepage');
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if (this.state.loading) {
            return false;
        }

        let { userData } = this.state;
        let { image } = this.state;

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
                    <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImage()}>
                        {image && <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={{ width: 200, height: 200, borderRadius: 200 }} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.inputs}>
                    <TextInput ref='nome' style={styles.input} placeholderTextColor={"black"} placeholder={"O nome cadastrado era '" + userData[0].nome + "'."} onChangeText={(nome) => this.setState({ nome })} />
                    {this.isFieldInError('nome') && this.getErrorsInField('nome').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}

                    <TextInput ref='email' style={styles.input} placeholderTextColor={"black"} placeholder={"O e-mail cadastrado era '" + userData[0].email + "'."} onChangeText={(email) => this.setState({ email })} />
                    {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}

                    <TextInput ref='senha' style={styles.input} secureTextEntry={true} placeholderTextColor={"black"} placeholder={"Senha"} onChangeText={(senha) => this.setState({ senha })}/>
                    {this.isFieldInError('senha') && this.getErrorsInField('senha').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}

                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholderTextColor={"black"} placeholder={'\xa0' + "Confirmar senha"} />
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Concluir edição"} onPress={() => this.validation(this.props.navigation)} />
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.getPermissionAsync();
        
        this.getData();
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
                this.setState({ image: result.base64 });
            }
            this.state.image = result.base64;
        } catch (E) {
            console.log(E);
        }
    };
}

const styles = StyleSheet.create({
    mensagemErro: {
        color: "red",
        marginLeft: 20,
        fontSize: 12
    },
    back: {
        height: 35,
        width: 35,
        marginTop: 25,
        marginLeft: 3
    },
    logo: {
        height: 200,
        width: 200,
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
        marginTop: 10
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

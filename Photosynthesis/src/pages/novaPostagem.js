import React from 'react';
import { Component } from "react";
import { Text, Image, StyleSheet, View, Button, TextInput, Alert, AsyncStorage, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';
import ValidationComponent from 'react-native-form-validator';

export default class NovaPostagem extends ValidationComponent {

    constructor(props) {
        super(props);
        this.deviceLocale = "ptBR";
        this.state = { nomePlanta: "", especie: "", idade: "", image: null, user: null, openedSelector: false };
    }

    validation(navigation) {
        this.validate({
            nomePlanta: { minlength: 3, maxlength: 100, required: true },
            especie: { minlength: 3 },
            idade: { minlength: 3, number: true }
        });

        if (this.isFormValid()) {
            this.submit(navigation);
        }
    }

    submit(navigation) {

        api.post('/social/postPlant', {
            nomePlanta: this.state.nomePlanta,
            especie: this.state.especie,
            idade: this.state.idade,
            foto: 'data:image/jpeg;base64,' + this.state.image.base64,
            user: this.state.user
        }).then(function (response) {
            Alert.alert("Cadastrado com sucesso!");
            navigation.navigate('Social');
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let { image } = this.state;
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView>
                    <View>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity activeOpacity={.5} onPress={() => this.openSelector()}>
                            {!image && <Image source={require('../../assets/logo_add_planta.png')} style={styles.logo}></Image>}
                        </TouchableOpacity>
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 200 }} />}
                    </View>
                    <View style={styles.inputs}>
                        <TextInput ref='nomePlanta' style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nome da planta"} onChangeText={(nomePlanta) => this.setState({ nomePlanta })} />
                        {this.isFieldInError('nomePlanta') && this.getErrorsInField('nomePlanta').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}

                        <TextInput ref='especie' style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Espécie"} onChangeText={(especie) => this.setState({ especie })} />
                        {this.isFieldInError('especie') && this.getErrorsInField('especie').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}

                        <TextInput ref='idade' style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Idade"} onChangeText={(idade) => this.setState({ idade })} />
                        {this.isFieldInError('idade') && this.getErrorsInField('idade').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}
                    </View>
                    <View style={styles.button}>
                        <Button color={'rgb(146, 211, 110)'} title={"Postar"} onPress={() => this.validation(this.props.navigation)} />
                    </View>
                </KeyboardAvoidingView>
                {this.state.openedSelector &&
                    <View style={styles.seletor}>
                        <View style={{ flexDirection: "row", marginTop: 30 }}>
                            <View style={{ flex: 1, marginLeft: 35 }}>
                                <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImageFromCamera()}>
                                    <Image source={require('../../assets/camera.png')} style={{ height: 100, width: 100 }}></Image>
                                </TouchableOpacity>
                                <Text style={styles.subtitles}>Câmera</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImageFromLibrary()}>
                                    <Image source={require('../../assets/gallery.png')} style={{ height: 100, width: 100 }}></Image>
                                </TouchableOpacity>
                                <Text style={styles.subtitles}>Galeria</Text>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }

    componentDidMount() {
        this.getPermissionAsync();

        this.getUserProperties();
    }

    async getUserProperties() {
        await this.setState({ user: await AsyncStorage.getItem('idUser') });
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Desculpe, precisamos da permissão para acesso a câmera!');
            }
        }
    };

    openSelector = async () => {
        if (this.state.openedSelector == false) {
            this.setState({ openedSelector: true })
        }
        if (this.state.openedSelector == true) {
            this.setState({ openedSelector: false })
        }
    };

    _pickImageFromLibrary = async () => {
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
            this.openSelector();
            this.state.image = result;
        } catch (E) {
            console.log(E);
        }
    };

    _pickImageFromCamera = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
            this.openSelector();
            this.state.image = result;
        } catch (E) {
            console.log(E);
        }
    };
}

const styles = StyleSheet.create({
    subtitles: {
        marginLeft: 25,
        marginTop: -10
    },
    seletor: {
        zIndex: 1000,
        backgroundColor: "#e7e7e7",
        borderTopColor: "black",
        borderWidth: 0.5,
        top: 520,
        height: 180,
        width: 400,
        position: "absolute"
    },
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
    }
})
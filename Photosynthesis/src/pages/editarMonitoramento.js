import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, Alert, TouchableHighlight, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';
import ValidationComponent from 'react-native-form-validator';

export default class EditarMonitoramento extends ValidationComponent {

    constructor(props) {
        super(props);
        this.deviceLocale = "ptBR";
        this.state = { apelido: "", especie: "", image: null, loading: true, plants: null, openedSelector: false };
    }

    async getItemToDelete() {
        api.get('/monitor/getMonitorById', {
            params: { id: await AsyncStorage.getItem('idToEdit') }
        }).then(res => {
            this.setState({ plants: res.data, loading: false, image: res.data[0].foto });
        })
    }

    validation(navigation) {
        this.validate({
            apelido: { minlength: 3, maxlength: 100, required: true },
            especie: { minlength: 3 }
        });

        if (this.isFormValid()) {
            this.submit(navigation);
        }
    }

    submit(navigation) {
        api.post('/monitor/editMonitor', {
            id: this.state.plants[0].id,
            apelido: this.state.apelido,
            especie: this.state.especie,
            foto: 'data:image/jpeg;base64,' + this.state.image.base64
        }).then(function (response) {
            navigation.navigate('Homepage');
            Alert.alert("Cadastrado com sucesso!");
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        let { plants, image } = this.state;

        if (this.state.loading) {
            return false;
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white' onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
                    <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                </TouchableHighlight>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.openSelector()}>
                        {!image && <Image source={require('../../assets/logo_add_planta.png')} style={{ width: 250, height: 250, borderRadius: 200 }}></Image>}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.openSelector()}>
                        {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, borderRadius: 200 }} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.inputs}>
                    <TextInput ref='apelido' style={styles.input} placeholderTextColor={"black"} placeholder={"O nome (apelido) cadastrado era: " + plants[0].apelido} onChangeText={(apelido) => this.setState({ apelido })} />
                    {this.isFieldInError('apelido') && this.getErrorsInField('apelido').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}

                    <TextInput ref='especie' style={styles.input} placeholderTextColor={"black"} placeholder={"A espécie cadastrada era: " + plants[0].especie} onChangeText={(especie) => this.setState({ especie })} />
                    {this.isFieldInError('especie') && this.getErrorsInField('especie').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}
                </View>

                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Cadastrar planta"} onPress={() => this.validation(this.props.navigation)} />
                </View>
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

        this.getItemToDelete();
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
    TouchableHighlight: {
        width: 100,

    },
    esqueceuSenha: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "center"
    },
    esqueceuSenhaText: {
        marginTop: -26,
        fontSize: 23,
        padding: 30,
        textAlign: "center"
    },
    add_img: {
        width: 220,
        height: 220,
        alignSelf: "center",

    },
    back: {
        width: 30,
        height: 30,
        marginTop: 50,
        marginLeft: 20

    },
    input: {
        alignSelf: "center",
        backgroundColor: 'rgb(247, 246, 246)',
        borderColor: 'rgb(242, 241, 241)',
        borderWidth: 1,
        padding: 10,
        marginTop: 25,
        height: 50,
        width: 320,
        borderRadius: 4
    },
    inputs: {
        marginTop: 20
    },
    button: {
        alignSelf: "center",
        marginTop: 40,
        width: 320
    },
    footer: {
        marginTop: 220,
        alignSelf: "center"
    }
});
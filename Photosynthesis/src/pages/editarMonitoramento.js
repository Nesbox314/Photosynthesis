import React, { Component } from 'react';
import { View, Image, StyleSheet, Button, Alert, TouchableHighlight, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';

export default class EditarMonitoramento extends Component {

    state = {
        plants: null,
        loading: true,
        image: null
    }

    async getItemToDelete() {
        api.get('/monitor/getMonitorById', {
            params: { id: await AsyncStorage.getItem('idToEdit') }
        }).then(res => {
            this.setState({ plants: res.data, loading: false, image: res.data[0].foto });
        })
    }

    submit(navigation) {
        api.post('/monitor/editMonitor', {
            id: this.state.plants[0].id,
            apelido: this.state.apelido,
            especie: this.state.especie,
            foto: this.state.image
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
                    <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImage()}>
                        {!image && <Image source={require('../../assets/logo_add_planta.png')} style={{ width: 250, height: 250, borderRadius: 200 }}></Image>}
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImage()}>
                        {image && <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={{ width: 250, height: 250, borderRadius: 200 }} />}
                    </TouchableOpacity>
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholderTextColor={"black"} placeholder={plants[0].apelido} onChangeText={(apelido) => this.setState({ apelido })} />
                    <TextInput style={styles.input} placeholderTextColor={"black"} placeholder={plants[0].especie} onChangeText={(especie) => this.setState({ especie })} />
                </View>

                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Cadastrar planta"} onPress={() => this.submit(this.props.navigation)} />
                </View>

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
import React from 'react';
import { Component } from "react";
import { Image, StyleSheet, View, Button, TextInput, Alert, AsyncStorage } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';

export default class NovaPostagem extends Component {

    state = {
        image: null,
        user: null
    };

    submit(navigation) {
        api.post('/social/postPlant', {
            nomePlanta: this.state.nomePlanta,
            especie: this.state.especie,
            idade: this.state.idade,
            foto: this.state.image.base64,
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

                <View>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/back.png')} style={styles.back}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImage()}>
                        {!image && <Image source={require('../../assets/logo_add_planta.png')} style={styles.logo}></Image>}
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, borderRadius: 200 }} />}
                </View>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nome da planta"} onChangeText={(nomePlanta) => this.setState({ nomePlanta })} />
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Espécie"} onChangeText={(especie) => this.setState({ especie })} />
                    <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Idade"} onChangeText={(idade) => this.setState({ idade })} />
                </View>
                <View style={styles.button}>
                    <Button color={'rgb(146, 211, 110)'} title={"Postar"} onPress={() => this.submit(this.props.navigation)} />
                </View>
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

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                base64: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
            console.log(this.state.image);
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
        height: 300,
        width: 300,
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
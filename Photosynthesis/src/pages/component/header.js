import React from 'react';
import { Component } from 'react';
import { Text, Image, StyleSheet, View, Button, TextInput, Alert, AsyncStorage } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../services/api';

export default class Header extends Component {

    state = {
        userData: null,
        loading: true
    };

    componentDidMount() {
        this.getData();
    }

    async getData() {
        api.get('/usuarios/getUserDate', {
            params: {
                id: await AsyncStorage.getItem('idUser')
            }
        }).then(res => {
            this.setState({ userData: res.data, loading: false });
        });
    }

    render() {

        const { userData } = this.state;

        if (this.state.loading) {
            return false;
        }

        return (
            <View style={styles.viewPrincipal}>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Image source={require('../../../assets/logo.png')} style={styles.imagem}></Image>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.navigation.navigate('editarPerfilUsuario')}>
                                {userData[0].foto == null && <Image source={require('../../../assets/user.png')} style={styles.patternUser} />}
                                {userData[0].foto && <Image source={{ uri: 'data:image/jpeg;base64,' + userData[0].foto }} style={styles.user} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewPrincipal: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 75,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC'
    },
    imagem: {
        marginTop: 38,
        width: 170,
        height: 25,
        marginLeft: 5
    },
    patternUser: {
        height: 33,
        width: 33,
        top: 32,
        left: 135
    },
    user: {
        height: 35,
        width: 35,
        marginTop: 30,
        marginLeft: 135,
        borderRadius: 200
    }
})
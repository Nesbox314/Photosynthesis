import React, { Component } from 'react';
import { View, Image, StyleSheet, Button, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';

export default class cadastroDePlantas extends Component {

  state = {
    image: null
  };

  submit(navigation) {
    api.post('/monitor/newMonitor', {
      apelido: this.state.apelido,
      especie: this.state.especie,
      foto: this.state.image.base64
    }).then(function (response) {
      Alert.alert("Cadastrado com sucesso!");
      navigation.navigate('Homepage');
    }).catch(function (error) {
      console.log(error);
    });

    this.setState({ image: null })
  }

  render() {
    let { image } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <TouchableHighlight style={styles.TouchableHighlight} underlayColor='white' onPress={() => this.props.navigation.navigate('configuracaoDeMonitoramento')}>
          <Image source={require('../../assets/back.png')} style={styles.back}></Image>
        </TouchableHighlight>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={.5} onPress={() => this._pickImage()}>
            {!image && <Image source={require('../../assets/userPhoto.png')} style={{ width: 250, height: 250, borderRadius: 200 }}></Image>}
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 250, height: 250, borderRadius: 200 }} />}
        </View>
        <View style={styles.inputs}>
          <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nome (apelido)"} onChangeText={(apelido) => this.setState({ apelido })} />
          <TextInput style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Espécie"} onChangeText={(especie) => this.setState({ especie })} />
        </View>

        <View style={styles.button}>
          <Button color={'rgb(146, 211, 110)'} title={"Cadastrar planta"} onPress={() => this.submit(this.props.navigation)} />
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
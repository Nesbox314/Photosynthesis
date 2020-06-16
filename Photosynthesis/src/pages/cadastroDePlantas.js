import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Button, Alert, TouchableHighlight, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../services/api';
import ValidationComponent from 'react-native-form-validator';

export default class cadastroDePlantas extends ValidationComponent {

  constructor(props) {
    super(props);
    this.deviceLocale = "ptBR";
    this.state = { apelido: "", especie: "" };
  }

  state = {
    image: null,
    userId: null
  };

  validation(navigation) {
    this.validate({
      apelido: { minlength: 3, maxlength: 100, required: true },
      especie: { minlength: 3, maxlength: 100 }
    });

    if (this.isFormValid()) {
      this.submit(navigation);
    }
  }

  submit(navigation) {
    api.post('/monitor/newMonitor', {
      apelido: this.state.apelido,
      especie: this.state.especie,
      foto: this.state.image.base64,
      user: this.state.userId
    }).then(function (response) {
      var param = parseInt(response.data.split(":").pop());
      api.post(`/dadossensor/postDadosSensor?estadoUmidade=N/A&monitor=${param}`)
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
            {!image && <Image source={require('../../assets/logo_add_planta.png')} style={{ width: 200, height: 200, borderRadius: 200 }}></Image>}
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 200 }} />}
        </View>

        <View style={styles.inputs}>
          <TextInput ref='apelido' style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Nome (apelido)"} onChangeText={(apelido) => this.setState({ apelido })} />
          {this.isFieldInError('apelido') && this.getErrorsInField('apelido').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}

          <TextInput ref='especie' style={styles.input} placeholderTextColor={'rgb(100, 100, 100)'} placeholder={'\xa0' + "Espécie"} onChangeText={(especie) => this.setState({ especie })} />
          {this.isFieldInError('especie') && this.getErrorsInField('especie').map(errorMessage => <Text style={styles.mensagemErro}>{errorMessage}</Text>)}
        </View>

        <View style={styles.button}>
          <Button color={'rgb(146, 211, 110)'} title={"Cadastrar planta"} onPress={() => this.validation(this.props.navigation)} />
        </View>

      </View>
    )
  }

  componentDidMount() {
    this.getPermissionAsync();

    this.getUserProperties();
  }

  async getUserProperties() {
    this.setState({ userId: await AsyncStorage.getItem('idUser') });
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
  mensagemErro: {
    color: "red",
    marginLeft: 20,
    fontSize: 12
  },
  TouchableHighlight: {
    width: 100,

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
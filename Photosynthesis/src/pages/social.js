import React, { Component } from "react";
import { View, Text } from "react-native";
import Header from "./component/header";

import axios from 'axios';

const api = axios.create({
    baseURL: 'http:\\192.168.1.8:3000'
});

var plantsArray = [];

export default class Social extends Component {

    state = {
        plants: []
    };

    componentDidMount(){
        api.get('/social/getTodosPlant').then(res => {
            this.setState({ plants: res.data })
        })
    }
    
    render(){
        return(
            <View>
                {this.state.plants.map(plant => <Text>{plant.especie}</Text>)}
            </View>
        )
    }
}
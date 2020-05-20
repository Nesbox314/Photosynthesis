import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import Header from "./component/header";
import axios from 'axios';
import HomepageSecunsari from "./homepageSecundaria";
import Homepage from "./homepage";

const api = axios.create({
    baseURL: 'http:\\192.168.1.8:3000'
});

export default class HomepageSelect extends Component {

    state = {
        plants: null,
        loading: true
    }

    componentDidMount(){
        api.get('/monitor/getMonitors').then(res => { 
            this.setState({ plants: res.data, loading: false });
        });
    }

    render(){
        const { plants } = this.state;

        if ( this.state.loading ) {
            return false;
        }

        if(plants.length > 1){
            return(
                <HomepageSecunsari navigation={this.props.navigation}></HomepageSecunsari>
            )
        }
        if(plants.length <= 1){
            return(
                <Homepage navigation={this.props.navigation}></Homepage>
            )
        }
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 70
    },
    views: {
        marginTop: 10,
        backgroundColor: "gray"
    },
    borderPhoto: {
        borderColor: "black",
        borderWidth: 1
    },
    image: {
        width: 340, 
        height: 240, 
        alignSelf: "center"
    }
})
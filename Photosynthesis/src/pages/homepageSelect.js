import React, { Component } from "react";
import { StyleSheet } from "react-native";
import HomepageSecunsari from "./homepageSecundaria";
import Homepage from "./homepage";
import api from '../services/api';

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
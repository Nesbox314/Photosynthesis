import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import Header from "./component/header";
import api from '../services/api';

export default class Social extends Component {

    constructor(){
        super();
        api.get('/social/getTodosPlant').then(res => {
            this.setState({ plants: res.data })
        })
    };

    state = {
        plants: []
    };
    
    render(){
        return(
            <View>
                <Header></Header>
                <View style={styles.view}>
                    {this.state.plants.map(plant =>
                    <View key={plant.id} style={styles.views}>
                        <View>
                            <Image style={{ width: 250, height: 250}} source={{ uri: plant.foto }} />
                        </View>
                    </View>
                    )}
                </View>
                <Button onPress={() => this.props.navigation.navigate('NovaPostagem')} title={"Nova postagem"}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        marginTop: 70
    },
    views: {
        marginTop: 10,
        backgroundColor: "gray"
    }
})

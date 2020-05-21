import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import Header from "./component/header";
import api from '../services/api';
import TabNavigator from "./component/tabNavigator";

export default class Social extends Component {

    state = {
        plants: null,
        loading: true
    }

    componentDidMount(){
        api.get('/social/getTodosPlant').then(res => { 
            this.setState({ plants: res.data, loading: false });
        });
    }

    render(){
        const { plants } = this.state;

        if ( this.state.loading ) {
            console.log('carregando');
            return false;
        }

        return(
            <View>
                <Header></Header>
                <View style={styles.view}>
                    <View>
                        {plants.map(plant => 
                        <View key={plant.id} style={styles.borderPhoto}>
                            <View>
                                <Text>{plant.nomePlanta}</Text>
                            </View>
                            <View>
                                {console.log('data:image/jpeg;base64,' + plant.foto)}
                                <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + plant.foto}} />
                            </View>
                        </View>
                        )}
                    </View>
                </View>
                <Button onPress={() => this.props.navigation.navigate('NovaPostagem')} title={"Nova postagem"}></Button>
                <View style={styles.button}>
                    <TabNavigator navigation={this.props.navigation}></TabNavigator>
                </View>
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
    },
    borderPhoto: {
        borderColor: "black",
        borderWidth: 1
    },
    image: {
        width: 340, 
        height: 240, 
        alignSelf: "center"
    },
    button: {
        marginTop: 515
    }
})

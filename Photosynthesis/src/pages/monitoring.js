import React from 'react';
import {  Component } from "react";
import { View, Text } from 'react-native';
import TabNavigator from './component/tabNavigator';

export default class Monitoring extends Component {
    render (){
        return (
            <View>
                <Text>TESTE</Text>
                <View>
                    <TabNavigator navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}
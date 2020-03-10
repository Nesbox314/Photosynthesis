import * as React from 'react';
import { Text, View, Image } from 'react-native';

export default function Index() {
    return (
        <View>
            <Text>Página inicial do Photosynthesis</Text>
            <Image source={
                require('../assets/images/logo.jpeg')}></Image>
        </View>
    )
}
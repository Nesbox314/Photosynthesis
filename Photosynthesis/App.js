import React, { Component } from 'react';
import StackNavigator from './src/pages/routing/stackNavigator';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http:\\192.168.1.8:3000'
});

export default class App extends Component {
  
  render(){
      return (
        <StackNavigator/>
      )
  }
}

   
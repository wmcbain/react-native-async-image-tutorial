/* @flow */

import React, { Component } from 'react';

import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import AsyncImage from './AsyncImage'

export default class AsyncImageAnimated extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>

        <AsyncImage
          style={{
            borderRadius: 50,
            height: 100,
            width: 100,
          }}
          placeholderSource={{
            uri: 'https://i.imgur.com/TSl1zQR.jpg'
          }}
          source={{
            uri: 'https://i.imgur.com/R5TraVR.png'
          }}
          placeholderColor='#b3e5fc'/>

      </View>
    );
  }
}

AppRegistry.registerComponent('AsyncImageAnimated', () => AsyncImageAnimated);

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import dataLoading from '../../assets/animation/dataloading.json';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <View
        style={{
            flex:1,
            justifyContent:'center',
            backgroundColor:'white'
        }}>
         <LottieView
        source={dataLoading}
        autoPlay
        loop
      />
    </View>
    );
  }
}

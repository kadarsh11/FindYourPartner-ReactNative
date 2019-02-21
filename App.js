import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from './src/screens/login';
import UserDetailScreen from './src/screens/user-detail';
import HomeScreen from './src/screens/home';
import ImageUploadScreen from './src/screens/image-upload';

import './src/db';
import CardDetailsScreen from './src/screens/card-details';
import TermsScreen from './src/screens/components/termsAndCondtions';
import UpdateImageScreen from './src/screens/update_profile_image';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
      <StackNavigation/>
    );
  }
}

const StackNavigation=createStackNavigator({
  Login:{
    screen:LoginScreen,
    navigationOptions:{
      header:null
    }
  },
  UserDetail:{
    screen:UserDetailScreen,
    navigationOptions:{
      header:null
    }
  },
  Home:{
    screen:HomeScreen,
    navigationOptions:{
      header:null
    }
  },
  CardDetails:{
    screen:CardDetailsScreen,
    navigationOptions:{
      header:null
    }
  },
  ImageUpload:{
    screen:ImageUploadScreen,
    navigationOptions:{
      header:null
    }
  },
  Terms:{
    screen:TermsScreen,
    navigationOptions:{
      header:null
    }
  },
  UpdateImage:{
    screen:UpdateImageScreen,
    navigationOptions:{
      header:null
    }
  }
},
{
  initialRouteName:'Login',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

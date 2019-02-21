import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { Container,Button,Text } from 'native-base';
import CustomHeader from './components/customHeader';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  componentWillMount(){
    AsyncStorage.removeItem("fyp:auth:userId");
    this.props.navigation.replace('Login');
  }

  logout=()=>{
    AsyncStorage.removeItem("fyp:auth:userId");
    this.props.navigation.replace('Login');
  }

  render() {
    return (
      <Container>
        <CustomHeader title="Logout--" drawerOpen={() => this.props.navigation.openDrawer()} textColor="#8e44ad" backgroundColor="white"/>
        <Button 
        style={{ width: '100%', textAlign: 'center', marginTop: 40, borderRadius: 15, backgroundColor: '#E91E63' }}
                    onPress={() => this.logout()}>
                    <Text style={{ paddingLeft: "40%" }}>Logout</Text>
        </Button>
      </Container>
    );
  }
}

import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Header, Body, Title, Content, Left, Icon, Right } from 'native-base'

class CustomHeader extends Component {
    render() {
        return (
            <Header style={{backgroundColor:this.props.backgroundColor}}>
                <Left><Icon name="ios-arrow-back-outline" style={{paddingLeft: "20%",}} onPress={() => this.props.goBack()} /></Left>
                <Body>
                    <Title style={{color:this.props.textColor}}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
export default CustomHeader;
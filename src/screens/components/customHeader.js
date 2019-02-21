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
                <Left><Icon name="ios-menu" style={{paddingLeft: "20%",}} onPress={() => this.props.drawerOpen()} /></Left>
                <Body>
                    <Title style={{color:this.props.textColor}}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
export default CustomHeader;
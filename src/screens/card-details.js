import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView
} from 'react-native';
import { ListItem, Left, Thumbnail, Body, Text, List, Content, Container, Header,Right,Title,Icon } from 'native-base';

export default class ProfileView extends Component {

    state = {
        data: this.props.navigation.state.params.userData,
        matched: this.props.navigation.state.params.matched,
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                <Left><Icon name="ios-arrow-back-outline" style={{paddingLeft: "20%"}}  onPress={() => this.props.navigation.goBack()} /></Left>
                    <Body>
                        <Title style={{ color: '#8e44ad' }}>Details</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                    <Image style={styles.avatar}
                            source={{ uri: this.state.data.profileImage }} />
                        <Text style={styles.name}>
                            {this.state.data.firstName} {this.state.data.lastName}
                        </Text>
                    </View>
                </View>

                <Content>
                    <ScrollView>
                    <List>
                        {this.state.matched ?
                            <ListItem avatar>
                                <Left>
                                    <Thumbnail source={ require('../../assets/phone-call.png') } />
                                </Left>
                                <Body>
                                    <Text>{this.state.data.phoneNumber}</Text>
                                    <Text note>Phone Number</Text>
                                </Body>
                            </ListItem> : null}
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={require('../../assets/location.png')} />
                            </Left>
                            <Body>
                                <Text>{this.state.data.state}</Text>
                                <Text note>{this.state.data.city}</Text>
                                <Text note>{this.state.data.pincode}</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={ require('../../assets/scholarship.png') } />
                            </Left>
                            <Body>
                                <Text>{this.state.data.highestEducation}</Text>
                                <Text note>Education</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={ require('../../assets/ruler.png') }/>
                            </Left>
                            <Body>
                                <Text>Height  {this.state.data.height}</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={ require('../../assets/ring.png') } />
                            </Left>
                            <Body>
                                <Text>{this.state.data.martialStatus}</Text>
                                <Text note>Martial Status</Text>
                            </Body>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={ require('../../assets/pray.png') } />
                            </Left>
                            <Body>
                                <Text>{this.state.data.religion}</Text>
                                <Text note>Religion</Text>
                            </Body>
                        </ListItem>
                    </List>
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#1E90FF",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 65,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: "#696969",
    }
});
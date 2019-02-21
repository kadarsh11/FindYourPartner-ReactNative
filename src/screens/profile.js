import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Container, Text, List, ListItem, Footer, Picker, Item, Icon, Input, Button } from 'native-base';
import CustomHeaderWithBack from './components/customHeaderWithBackButton';
import firebase from 'firebase';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            name: '',
            state: '',
            city: '',
            pincode: '',
            profileImage: '',
            highestEducation: '',
            phoneNumber: '',
            religion: '',
            language: '',
            martialStatus: '',
            height: ''
        };
    }

    componentWillMount = () => {
        AsyncStorage.getItem("fyp:auth:userId")
            .catch((error) => console.log("Error while getting User ID from AsyncStorage"))
            .then((gotUserId) => {
                if (!gotUserId) {
                    console.log("Somethign went wrong in AsynStorage");
                    this.props.navigation.replace('Login');
                }
                else {
                    this.setState({ userId: gotUserId });
                    firebase.database().ref('user/' + gotUserId)
                        .on('value', (gotData) => {
                            console.log(gotData.val());
                            var user = gotData.val();
                            this.setState({
                                name: user.firstName + " " + user.lastName,
                                state: user.state,
                                city: user.city,
                                pincode: user.pincode,
                                profileImage: user.profileImage,
                                highestEducation: user.highestEducation,
                                phoneNumber: user.phoneNumber,
                                religion: user.religion,
                                language: user.language,
                                martialStatus: user.martialStatus,
                                height: user.height
                            })
                        });
                }
            })
    }

    updateDetails = () => {
        firebase.database().ref('user/' + this.state.userId).update({
            state: this.state.state,
            city: this.state.city,
            phoneNumber: this.state.phoneNumber,
            religion: this.state.religion,
            language: this.state.language,
            pincode: this.state.pincode,
            martialStatus: this.state.martialStatus,
            height: this.state.height,
            highestEducation: this.state.highestEducation
        })
            .then((con) => {
                Alert.alert(
                    'Updated Profile',
                    "Your Profile has been updated to the latest Data entered by you.",
                    [
                        { text: 'OK', onPress: () => console.log('Data Updated') },
                    ],
                    { cancelable: false }
                );
            })
            .catch((error) => {
                Alert.alert(
                    'Update Fail',
                    "Somthing went wrong",
                    [
                        { text: 'Try Again', onPress: () => console.log('Update Fail' + error) },
                    ],
                    { cancelable: false }
                );
            })
    }

    render() {
        return (
            <Container>
                <CustomHeaderWithBack title="Profile" goBack={() => this.props.navigation.goBack()} textColor="#8e44ad" backgroundColor="white" />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.name}>{this.state.name}</Text>
                        </View>
                        <Image style={styles.avatar} source={{ uri: this.state.profileImage }} />
                        <Button rounded style={styles.imageUpdate} onPress={()=>this.props.navigation.navigate('UpdateImage', { userId: this.state.userId , dImage: this.state.profileImage})} >
                        <Icon name="ios-person-add" style={{fontSize:24}}></Icon>
                        </Button>
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <List>
                                    <ListItem itemDivider>
                                        <Text>Contact Details</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Item success>
                                            <Input placeholder='State'
                                                onChangeText={(e) => this.setState({ state: e })}
                                                value={this.state.state} />
                                        </Item>
                                    </ListItem>
                                    <ListItem>
                                        <Item success>
                                            <Input placeholder='City'
                                                onChangeText={(e) => this.setState({ city: e })}
                                                value={this.state.city} />
                                        </Item>
                                    </ListItem>
                                    <ListItem>
                                        <Item success style={{ marginBottom: 6 }}>
                                            <Input placeholder='Pin Code'
                                                onChangeText={(e) => this.setState({ pincode: e })}
                                                value={this.state.pincode}
                                                keyboardType={'numeric'} />
                                        </Item>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text>Education</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Item picker>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                                style={{ width: undefined }}
                                                placeholder="Education"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.state.highestEducation}
                                                onValueChange={(e) => this.setState({ highestEducation: e })}
                                            >
                                                <Picker.Item label="Under Graduate" value="Graduate" />
                                                <Picker.Item label="Graduation" value="Graduation" />
                                                <Picker.Item label="Post Graduation" value="Post Graduation" />
                                                <Picker.Item label="PHD" value="PHD" />
                                            </Picker>
                                        </Item>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text>Phone Number</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Item success>
                                            <Input placeholder='Phone Number'
                                                maxLength={10}
                                                onChangeText={(e) => { this.setState({ phoneNumber: e }) }}
                                                value={this.state.phoneNumber}
                                                keyboardType='number-pad' />
                                        </Item>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text>Height</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            placeholder="Height"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.height}
                                            onValueChange={(e) => this.setState({ height: e })}
                                        >
                                            <Picker.Item label="4.1" value="4.1" />
                                            <Picker.Item label="4.2" value="4.2" />
                                            <Picker.Item label="4.3" value="4.3" />
                                            <Picker.Item label="4.4" value="4.4" />
                                            <Picker.Item label="4.5" value="4.5" />
                                            <Picker.Item label="4.6" value="4.6" />
                                            <Picker.Item label="4.7" value="4.7" />
                                            <Picker.Item label="4.8" value="4.8" />
                                            <Picker.Item label="4.9" value="4.9" />
                                            <Picker.Item label="5.0" value="5.0" />
                                            <Picker.Item label="5.1" value="5.1" />
                                            <Picker.Item label="5.2" value="5.2" />
                                            <Picker.Item label="5.3" value="5.3" />
                                            <Picker.Item label="5.4" value="5.4" />
                                            <Picker.Item label="5.5" value="5.5" />
                                            <Picker.Item label="5.6" value="5.6" />
                                            <Picker.Item label="5.7" value="5.7" />
                                            <Picker.Item label="5.8" value="5.8" />
                                            <Picker.Item label="5.9" value="5.9" />
                                            <Picker.Item label="6.0" value="6.0" />
                                            <Picker.Item label="6.1" value="6.1" />
                                            <Picker.Item label="6.2" value="6.2" />
                                            <Picker.Item label="6.3" value="6.3" />
                                            <Picker.Item label="6.4" value="6.4" />
                                        </Picker>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text>Maritial Status</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            placeholder="Maritial Status"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.martialStatus}
                                            onValueChange={(e) => this.setState({ martialStatus: e })}
                                        >
                                            <Picker.Item label="Married" value="Married" />
                                            <Picker.Item label="Unmarried" value="Unmarried" />
                                            <Picker.Item label="Divorced" value="Divorced" />
                                        </Picker>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text>Mother Tongue</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            placeholder="Language"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.language}
                                            onValueChange={(e) => this.setState({ language: e })}
                                        >
                                            <Picker.Item label="Hindi" value="Hindi" />
                                            <Picker.Item label="English" value="English" />
                                            <Picker.Item label="Urdu" value="Urdu" />
                                        </Picker>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text>Religion</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                                            style={{ width: undefined }}
                                            placeholder="Religion"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.religion}
                                            onValueChange={(e) => this.setState({ religion: e })}
                                        >
                                            <Picker.Item label="Hindu" value="hindu" />
                                            <Picker.Item label="Muslim" value="muslim" />
                                            <Picker.Item label="Sikh" value="sikh" />
                                            <Picker.Item label="don't believe" value="Don't Believe" />
                                        </Picker>
                                    </ListItem>
                                </List>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer style={{ height: 40, backgroundColor: 'white', marginBottom: 8 }}>
                    <Button rounded success style={{ width: '80%' }} onPress={() => this.updateDetails()}>
                        <Text style={{ marginLeft: '40%' }}>Update</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#8e44ad",
        height: 180,
        textAlign: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 110
    },
    imageUpdate:{
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 220,
        backgroundColor:'#fbc531'
    },
    body: {
        marginTop: 80,
    },
    bodyContent: {
        flex: 1,
        padding: 30,
    },
    name: {
        fontSize: 33,
        color: "#ffffff",
        fontWeight: "600",
        textAlign: 'center',
        marginTop: 30
    }
});

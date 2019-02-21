import React, { Component } from 'react';
import {
    Container,
    Button,
    Form,
    Item as FormItem,
    Input,
    Label,
    Text,
    Icon,
    ScrollView,
    CheckBox,
    Body,
    ListItem
} from 'native-base';
import { Alert,Image } from 'react-native';
import LottieView from 'lottie-react-native';
import {
    KeyboardAvoidingView,
    View,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import anim from '../../assets/animation/loginAnimation.json';
import loading from '../../assets/animation/material_wave_loading.json';
import firebase from 'firebase';

export default class FindLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false,
            loginCheck: true,
            hideButton: false,
            confirmPassword: '',
            headerText: 'Find Your Partner',
            terms:false
        };
    }

    componentWillMount = () => {
        AsyncStorage.getItem("fyp:auth:userId")
            .catch((error) => console.log("Error while getting User ID from AsyncStorage"))
            .then((gotUserId) => {
                console.log(gotUserId);
                if (!gotUserId) {
                    console.log("Somethign went wrong in AsynStorage");
                }
                else {
                    this.props.navigation.replace('Home', {
                        userId: gotUserId
                    })
                }
            })
    }

    signUpUser = () => {
        this.setState({ loading: true });
        if (this.state.confirmPassword == this.state.password) {
            
            if(this.state.terms==true){
                console.log("Starting Sign Up Process");
                try {
                    firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
                        .then(
                            (authData) => {
                                AsyncStorage.setItem("fyp:auth:userId", authData.user.uid);
                                console.log(authData.user.uid);
                                this.setState({ loading: false });
                                this.props.navigation.replace('UserDetail', {
                                    userId: authData.user.uid
                                })
                            }
                        )
                        .catch(e => {
                            this.setState({ loading: false });
                            Alert.alert(
                                'Signup Failed',
                                e.message,
                                [
                                    { text: 'Try Again', onPress: () => console.log('Trying again') },
                                ],
                                { cancelable: false }
                            );
                        })
                }
                catch (error) {
                    this.setState({ loading: false });
                    console.log("Something went wrong while signup" + error);
                }
            }
            else{
                this.setState({ loading: false });
            Alert.alert(
                'Signup Failed',
                "Agree to our Terms & Condition.",
                [
                    { text: 'Try Again', onPress: () => console.log('Trying again') },
                ],
                { cancelable: false }
            );
            console.log("Terms and conditon is not accepted");
            }
        }
        else {
            this.setState({ loading: false });
            Alert.alert(
                'Signup Failed',
                "Entered Password and confirm password are not same",
                [
                    { text: 'Try Again', onPress: () => console.log('Trying again') },
                ],
                { cancelable: false }
            );
            console.log("Entered Password and confirm password are not same");
        }
    }
    loginUser = () => {
        this.setState({ loading: true });
        try {
            firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
                .then(
                    (authData) => {
                        console.log("User ID --" + authData.user.uid);
                        firebase.database().ref('user/'+authData.user.uid).once('value',(data)=>{
                            console.log(data.val);    
                        });
                        AsyncStorage.setItem("fyp:auth:userId", authData.user.uid);
                        this.setState({ loading: false });
                        this.props.navigation.replace('Home', {
                            userId: authData.user.uid
                        });
                    }
                )
                .catch(e => {
                    console.log(e);
                    this.setState({ loading: false });
                    Alert.alert(
                        'Login Failed',
                        e.message,
                        [
                            { text: 'Try Again', onPress: () => console.log('Trying again') },
                        ],
                        { cancelable: false }
                    );
                })
        }
        catch (error) {
            this.setState({ loading: false });
            console.log("SOmething went wrong while SIgIn " + error);
        }
    }

    render() {
        const resizeMode = 'cover';
        const loginUX = <View style={{ flex: 1 }}>
            <Form style={{ padding: 30 }}>
                <FormItem floatingLabel>
                    <Label>Email ID</Label>
                    <Input onChangeText={(e) => this.setState({ username: e })} value={this.state.username} />
                </FormItem>
                <FormItem floatingLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(e) => this.setState({ password: e })} value={this.state.password} />
                </FormItem>
                <Button iconRight success
                    style={{ width: '100%', textAlign: 'center', marginTop: 40, borderRadius: 15 }}
                    onPress={() => this.loginUser()}>
                    <Text style={{ paddingLeft: "40%" }}>Login</Text>
                    <Icon name='arrow-forward' />
                </Button>
                <TouchableOpacity onPress={()=> this.setState({ loginCheck: false })}>
                    <Text style={{textAlign:'center',marginTop:'10%', color:'#e74c3c', fontSize:19}} >Create account </Text>
                </TouchableOpacity>
            </Form>
        </View>
        const signupUX = <View style={{ flex: 1, }}>
            <Form style={{ paddingLeft: 20, paddingRight: 20 }}>
                <FormItem floatingLabel>
                    <Label>Email ID</Label>
                    <Input onChangeText={(e) => this.setState({ username: e })} value={this.state.username} />
                </FormItem>
                <FormItem floatingLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(e) => this.setState({ password: e })} value={this.state.password} />
                </FormItem>
                <FormItem floatingLabel>
                    <Label>Confirm Password</Label>
                    <Input secureTextEntry={true} onChangeText={(e) => this.setState({ confirmPassword: e })} value={this.state.confirmPassword} />
                </FormItem>
                <ListItem style={{marginTop:20}}>
                    <CheckBox checked={this.state.terms} onPress={()=>this.setState({terms:!this.state.terms})} />
                    <Body>  
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Terms')}>
                            <Text>I agree to the terms of services.</Text>
                        </TouchableOpacity>
                    </Body>
                </ListItem>
                <Button iconRight danger
                    style={{ width: '100%', textAlign: 'center', marginTop: 30, borderRadius: 15, }}
                    onPress={() => this.signUpUser()}>
                    <Text style={{ paddingLeft: "40%", }}>SignUp</Text>
                    <Icon name='arrow-forward' />
                </Button>
                
                <TouchableOpacity onPress={()=> this.setState({ loginCheck: true })}>
                    <Text style={{textAlign:'center',marginTop:'10%', color:'#009432', fontSize:19}}>Login here </Text>
                </TouchableOpacity>
            </Form>
        </View>
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.6, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center', }}>
                    {this.state.loading ?
                        <LottieView
                            source={loading}
                            style={{ height: '100%' }}
                            autoPlay
                            loop
                        /> :
                        <Image
                            source={require('../../assets/logo.png')}
                        />
                    }
                    
                </View>
                {this.state.loginCheck ? loginUX : signupUX}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/* <Button success style={{ width: '50%', borderTopLeftRadius: 15 }} onPress={() => { this.setState({ loginCheck: true }) }}>
                        <Text style={{ paddingLeft: "45%" }}>Login</Text>
                    </Button>
                    <Button danger style={{ width: '50%', borderTopRightRadius: 15 }} onPress={() => { this.setState({ loginCheck: false }) }}>
                        <Text style={{ paddingLeft: "40%" }}>Sign Up</Text>
                    </Button> */}
                </View>
            </View>
        );
    }
}
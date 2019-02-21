import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Button, Content, Text, List, ListItem, Left, Thumbnail, Body, Right } from 'native-base';
import CustomHeader from '../components/customHeader';
import { createBottomTabNavigator } from 'react-navigation';
import firebase from 'firebase';
import MyLikeScreen from './my_like';
import RequestedScreen from './liked_by';
import LottieView from 'lottie-react-native';
import dataLoading from '../../../assets/animation/dataloading.json';

class MyLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cards_id: [],
      loading: true,
      nothing:false
    };
  }

  componentWillMount = () => {
    var today = new Date();
    var date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
    this.setState({ date });
    AsyncStorage.getItem("fyp:auth:userId")
      .then((gotUserId) => {
        this.setState({ userId: gotUserId });
        var dataKey = [];
        let data = [];
        var promise = [];
        console.log(this.state.userId);
        firebase.database().ref('user/'+this.state.userId).once("value",(snapshot)=>{
          if(snapshot.hasChild("matchedWith")){
            firebase.database().ref('user/' + this.state.userId + '/matchedWith').on('value', (snapshot) => {
              snapshot.forEach((result) => {
                data=[];
                dataKey.push(result.key);
                promise.push(firebase.database().ref('user').orderByKey().equalTo(result.key)
                  .once('value', (remainUserSnap) => {
                    remainUserSnap.forEach((resultedCard) => {
                      data.push(resultedCard.val());
                      console.log("All cards " + resultedCard.val());
                      this.setState({
                        cards: data,
                        cards_id: dataKey,
                        loading: false
                      });
                    })
                  }))
              });
            });
          }
          else{
            this.setState({nothing:true});
          }
        });
        
      })
      .catch((error) => {
        console.log("Something went wrong" + error);
        this.props.navigation.replace('Login');
      });
  }

  renderCard=(data)=> {
    var today = new Date();
    var ageString = data.dob;
    var yearOfBirth = ageString.substr(ageString.length - 5);
    return (
      <ListItem avatar  onPress={() => this.props.navigation.push('CardDetails',{userData:data,matched:true})}>
        <Left>
          <Thumbnail source={{ uri: data.profileImage }} />
        </Left>
        <Body>
          <Text>{data.firstName} {data.lastName}</Text>
          <Text note>{data.city}, {data.state}</Text>
        </Body>
        <Right>
          <Text note>{ today.getFullYear()-parseInt(yearOfBirth)} yr</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <CustomHeader title="Matched" drawerOpen={() => this.props.navigation.openDrawer()} textColor="#8e44ad" backgroundColor="white" />
        {this.state.loading == false ?
          <Content>
            <List>
              {this.state.cards.map((data) => this.renderCard(data))}
            </List>
          </Content> :
          <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'white'
          }}>
          {this.state.nothing ?<Text>Nothing Found</Text>:<LottieView
            source={dataLoading}
            autoPlay
            loop
          />}
          
        </View>}
      </Container>
    );
  }
}
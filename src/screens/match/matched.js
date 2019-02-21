import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Container, Button, Content, Text, List, ListItem, Left, Thumbnail, Body, Right, Icon } from 'native-base';
import CustomHeaderWithBack from '../components/customHeaderWithBackButton';
import { createBottomTabNavigator } from 'react-navigation';
import firebase from 'firebase';
import RequestedScreen from './liked_by';
import LottieView from 'lottie-react-native';
import dataLoading from '../../../assets/animation/dataloading.json';

class MatchedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cards_id: [],
      loading: true
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
        firebase.database().ref('user/'+this.state.userId).on('value',(snapshot)=>{
          if(snapshot.hasChild("matchedWith")){}
          else{
            this.setState({nothing:true});
          }
        });
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
                    loading: false,
                    nothing:false
                  });
                })
              }))
          });
          console.log(dataKey)  ;
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
      <ListItem avatar  onPress={() => this.props.navigation.push('CardDetails',{userData:data,matched:true})} key={data.userId}>
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
        <CustomHeaderWithBack title="Matched" goBack={() => this.props.navigation.goBack()} textColor="#8e44ad" backgroundColor="white" />
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
          {this.state.nothing ?
          <Text style={{color:'#c0392b',fontSize:28,fontWeight:'600',textAlign:'center',letterSpacing:2}}>No Match Found</Text> :<LottieView
            source={dataLoading}
            autoPlay
            loop
            style={{ }}
          />}
          
        </View>}
      </Container>
    );
  }
}

export default createBottomTabNavigator({
  Matched: MatchedScreen,
  Requested: RequestedScreen,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      let iconColor='#8e44ad';
      if (routeName === 'Matched') {
        iconName = 'ios-chatbubbles';
      } else if (routeName === 'Requested') {
        iconName = 'ios-contacts';
      }
      return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} style={{color:iconColor}}/>;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#8e44ad',
    inactiveTintColor: 'grey',
  },
}
);
import React, { Component } from 'react';
import Swiper from 'react-native-deck-swiper'
import { StyleSheet, Text, View, Image, AsyncStorage, Alert } from 'react-native';
import { Container, Button } from 'native-base';
import CustomHeaderWithBack from '../components/customHeaderWithBackButton';
import firebase from 'firebase';
import LottieView from 'lottie-react-native';
import dataLoading from '../../../assets/animation/dataloading.json';
import DialogInput from '../components/DialogInput';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class LikedBy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      cards: [],
      cards_id: [],
      loading: true,
      date: '',
      nothing: false,
      isReporting: false,
      affectedUser: ''
    };
  }

  blockUser = (cardId) => {
    firebase.database().ref('user/' + this.state.userId + '/likedBy/' + cardId).remove();
    firebase.database().ref('user/' + cardId + '/like/' + this.state.userId).remove();
    firebase.database().ref('user/' + this.state.userId + '/block/' + cardId).set({
      date: this.state.date
    }).then(() => console.log("My Block"));
    firebase.database().ref('user/' + cardId + '/blockedBy/' + this.state.userId).set({
      date: this.state.date
    }).then(() => console.log("Blocked By"));
    this.swiper.swipeTop();
  }

  reportUser = (cardId, reason) => {
    firebase.database().ref('flag').push(
      {
        reportedBy: this.state.userId,
        reportedTo: cardId,
        because: reason
      }
    );
    this.setState({ isReporting: false, affectedUser: '' });
  }

  renderCard = (card, index) => {
    console.log(this.state.cards[index]);
    var today = new Date();
    var ageString = this.state.cards[index].dob;
    var yearOfBirth = ageString.substr(ageString.length - 5);
    return (
      <View style={styles.card}>
        <Image
          style={{ flex: 1, borderRadius: 5 }}
          source={{ uri: this.state.cards[index].profileImage }}
        />
        <View style={{ margin: 20 }}>
          <Text style={{ backgroundColor: 'transparent', fontSize: 22, }}>{this.state.cards[index].firstName} {this.state.cards[index].lastname}</Text>
          <Text style={{ backgroundColor: 'transparent', fontSize: 18, color: '#7f8c8d' }}>{today.getFullYear() - parseInt(yearOfBirth)} yr</Text>
          <Text style={{ backgroundColor: 'transparent', fontSize: 17, color: '#7f8c8d' }}>{this.state.cards[index].city}, {this.state.cards[index].state}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View />
          <Button style={{ backgroundColor: 'white', paddingLeft: 20, marginBottom: 20 }} onPress={() => this.props.navigation.navigate('CardDetails', { userData: this.state.cards[index], matched: false })}>
            <Text style={{ color: '#8e44ad', paddingLeft: "10%", paddingRight: "10%", fontSize: 18 }}>Know more</Text>
          </Button>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", marginRight: 20 }}>
            <View>
              <Icon name="report" style={{ color: "#e74c3c" }} size={25} color="#e74c3c" onPress={() => {
                this.setState({
                  isReporting: true,
                  affectedUser: this.state.cards_id[index]
                });
              }} />
              <Text style={{ fontSize: 10, textAlign: 'center' }}>Report</Text>
            </View>
            <View>
              <Icon name="block" style={{ marginLeft: 10, color: "#c0392b" }} size={25} color="#c0392b" onPress={() => {
                Alert.alert(
                  'Block',
                  'Are you sure you want to block?',
                  [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'Block', onPress: () => this.blockUser(this.state.cards_id[index]) },
                  ],
                  { cancelable: false }
                )
              }} />
              <Text style={{ fontSize: 10, textAlign: 'center' }}>Block</Text>
            </View>
          </View>
        </View>
      </View>
    )
  };

  noCards = () => {
    return (
      <View style={styles.cardEmpty}>
        <Text style={styles.textEmpty}>No More Cards</Text>
      </View>
    );
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
        firebase.database().ref('user/' + this.state.userId).once("value", (snapshot) => {
          if (snapshot.hasChild("likedBy")) {
            firebase.database().ref('user/' + this.state.userId + '/likedBy').once('value', (snapshot) => {
              snapshot.forEach((result) => {
                console.log("IS this running");
                console.log(result.key);
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
            }).catch(e => console.log("Error running"));
          }
          else {
            this.setState({ nothing: true });
          }
        });

      })
      .catch((error) => {
        console.log("Something went wrong" + error);
        this.props.navigation.replace('Login');
      });
  }

  render() {
    return (
      <Container>
        <CustomHeaderWithBack title="Liked By" goBack={() => this.props.navigation.goBack()} textColor="#8e44ad" backgroundColor="white" />
        {this.state.loading == false ?
          <View style={styles.container}>
            <Swiper
              ref={swiper => {
                this.swiper = swiper
              }}
              backgroundColor='white'
              onSwipedAll={this.noCards}
              onSwiped={this.onSwiped}
              onTapCard={this.swipeLeft}
              cards={this.state.cards}
              cardIndex={this.state.cardIndex}
              cardVerticalMargin={80}
              renderCard={this.renderCard}
              onTapCard={() => console.log("Card Tapped")}
              onSwipedAll={this.onSwipedAllCards}
              stackSize={3}
              verticalSwipe={true}
              onSwipedLeft={
                (index) => {
                  firebase.database().ref('user/' + this.state.userId + '/nope/' + this.state.cards_id[index])
                    .set(
                      {
                        date: this.state.date
                      }
                    ).then(() => console.log("Inserted nope of my data"))
                    .catch((e) => console.log("went wrong in iserting nope in my data"));
                  firebase.database().ref('user/' + this.state.userId + '/likedBy/' + this.state.cards_id[index]).remove();
                }
              }
              onSwipedRight={
                (index) => {
                  firebase.database().ref('user/' + this.state.userId + '/matchedWith/' + this.state.cards_id[index])
                    .set(
                      {
                        date: this.state.date
                      }
                    ).then(() => console.log("Macthed with Inserted in my data"))
                    .catch((e) => console.log("matched with not inserted in my database"));
                  firebase.database().ref('user/' + this.state.cards_id[index] + '/matchedWith/' + this.state.userId)
                    .set(
                      {
                        date: this.state.date
                      }
                    ).then(() => console.log("Macthed with Inserted in Card Data"))
                    .catch((e) => console.log("matched with not inserted in card database"));
                  firebase.database().ref('user/' + this.state.userId + '/likedBy/' + this.state.cards_id[index]).remove();
                  firebase.database().ref('user/' + this.state.cards_id[index] + '/like/' + this.state.userId).remove();

                }
              }
              stackSeparation={15}
              overlayLabels={{
                bottom: {
                  title: 'View Later',
                  style: {
                    label: {
                      backgroundColor: '#6c5ce7',
                      borderColor: '#6c5ce7',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }
                },
                left: {
                  title: 'REJECT',
                  style: {
                    label: {
                      backgroundColor: '#c0392b',
                      borderColor: '#c0392b',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: -30
                    }
                  }
                },
                right: {
                  title: 'ACCEPT',
                  style: {
                    label: {
                      backgroundColor: '#00b894',
                      borderColor: '#00b894',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 30,
                      marginLeft: 30
                    }
                  }
                },
                top: {
                  title: 'View Later',
                  style: {
                    label: {
                      backgroundColor: '#6c5ce7',
                      borderColor: '#6c5ce7',
                      color: 'white',
                      borderWidth: 1
                    },
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }
                }
              }}
              animateOverlayLabelsOpacity
              animateCardOpacity
            >
            </Swiper>
          </View> :
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'white'
            }}>
            {this.state.nothing ?
              <Text style={{ color: '#c0392b', fontSize: 28, fontWeight: '600', textAlign: 'center', letterSpacing: 2 }}>Nobody Found</Text> : <LottieView
                source={dataLoading}
                autoPlay
                loop
                style={{}}
              />}

          </View>
        }
        <DialogInput isDialogVisible={this.state.isReporting}
          title={"Report User"}
          message={"What is the reason for your reporting?"}
          hintInput={"Feels Like Spam..."}
          submitInput={(inputText) => { this.reportUser(this.state.affectedUser, inputText) }}
          closeDialog={() => this.setState({ isReporting: false, affectedUser: '' })}>
        </DialogInput>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  card: {
    flex: 0.8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white'
  },
  cardEmpty: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "red"
  },
  textEmpty: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { Header, Body, Title, Container, Left, Icon, Right } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import imageLoading from '../../assets/animation/upload_loading.json';
import firstUploadAnimation from '../../assets/animation/firstUploadAnimation.json';
import LottieView from 'lottie-react-native';

import uploadCompleted from '../../assets/animation/uploadCompleted.json';

var _ = require('lodash');

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


class ImageUpload extends Component {
  constructor(props) {
    super(props)

    this.state = {
        dImage:this.props.navigation.state.params.dImage,
        uploadURL: '',
        userId: this.props.navigation.state.params.userId,
        show: '1',
        imageId:null
    }
  }

  componentWillMount(){
      var test=_.split(this.state.dImage, '%', 3);
      var test2=_.split(test[1], '?',1);
      this.setState({
          imageId:test2[0].substr(2)
      });
  }


  uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('images').child(`${sessionId}`);
  
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close();
          return imageRef.getDownloadURL();
        })
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          this.setState({ show: '2' });
          reject(error);
        })
    })
  }

  _pickImage = () => {
    this.setState({ show: '4' });
    ImagePicker.launchImageLibrary({}, response => {
      this.uploadImage(response.uri)
        .then(url => {
          firebase.database().ref('user/' + this.state.userId).update({
            profileImage: url
          }).then(() => {
            console.log("Image upload and inserted into database");
            firebase.storage().ref('images').child(this.state.imageId).delete();
            this.setState({ uploadURL: url, show: '3' });
          }).catch(error => {
            this.setState({ show: '2' });
            console.log(error);
          })
        })
        .catch(error => {
          this.setState({ show: '2' });
          console.log(error);
        })
    })
  }

  _moveToProfile = () => {
    this.props.navigation.goBack();
    console.log("PHOTO UPDATED");
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'white'}}>
              <Left>
                <Icon name="ios-arrow-back-outline" style={{color:'#8e44ad',paddingLeft: "10%",}} onPress={() => this.props.navigation.goBack()} /></Left>
                <Body>
                    <Title style={{color:'#8e44ad'}}> Update Profile Pic</Title>
                </Body>
                <Right />
        </Header>
        {
          (() => {
            switch (this.state.show) {
              case null:
                return null
              case '1':
                return (
                  <View>
                  <View
                    style={{
                      height:'55%',
                      width:'100%',
                      marginTop:'30%'
                    }}>
                    <LottieView
                      source={firstUploadAnimation}
                      autoPlay
                      loop 
                      style={{ }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => this._pickImage()}>
                    <Text style={styles.upload}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                </View>
                )
              case '2':
                return (
                  <View>
                    <Text style={{fontSize:20,color:'red',textAlign:'center',marginTop:20}}>Something Went Wrong</Text>
                    <View
                    style={{
                      height:'55%',
                      width:'100%',
                      marginTop:'10%'
                    }}>
                    <LottieView
                      source={firstUploadAnimation}
                      autoPlay
                      loop 
                      style={{ }}
                    />
                  </View>
                    <TouchableOpacity onPress={() => this._pickImage()}>
                      <Text style={styles.upload}>
                        Upload
                          </Text>
                    </TouchableOpacity>
                  </View>
                )
              case '3': return (
                <View>
                  <View
                    style={{
                      height:'55%',
                      width:'100%',
                      marginTop:'30%'
                    }}>
                    <LottieView
                      source={uploadCompleted}
                      autoPlay
                      speed={0.7}
                      loop={false}
                      style={{ }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => this._moveToProfile()}>
                    <Text style={styles.upload}>
                      Completed
                    </Text>
                  </TouchableOpacity>
                </View>
              )
              case '4': return (
                <View>
                  <Text style={{fontSize:20,color:'#e7174d',textAlign:'center',marginTop:20}}>Uploading...</Text>
                 <View
                    style={{
                      height:'55%',
                      width:'100%',
                      marginTop:'30%'
                    }}>
                    <LottieView
                      source={imageLoading}
                      autoPlay
                      loop 
                      style={{ }}
                    />
                  </View>
                </View>
              )
              default:
                return (
                  <View>
                  <View
                    style={{
                      height:'55%',
                      width:'100%',
                      marginTop:'30%'
                    }}>
                    <LottieView
                      source={firstUploadAnimation}
                      autoPlay
                      loop 
                      style={{ }}
                    />
                  </View>
                  <TouchableOpacity onPress={() => this._pickImage()}>
                    <Text style={styles.upload}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                </View>
                )
            }
          })()
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
  upload: {
    width:"80%",
    marginLeft:"10%",
    textAlign: 'center',
    color: 'green',
    padding: 10,
    fontSize:21,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'green'
  },
})

export default ImageUpload;
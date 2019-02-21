import Firebase from 'firebase';
 let config = {
    apiKey: "AIzaSyD4d8HpIe0Md9JsoXTHH9b3Dt5eKpOdF-Q",
    authDomain: "tinderclone-a0bb9.firebaseapp.com",
    databaseURL: "https://tinderclone-a0bb9.firebaseio.com",
    projectId: "tinderclone-a0bb9",
    storageBucket: "tinderclone-a0bb9.appspot.com",
    messagingSenderId: "496462354708"
  };
 export const db = Firebase.initializeApp(config);

 
import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyA1q_Cxdtjae8il0xLePwrrFUdWtNlMsA8",
  authDomain: "fir-playground-c7cd9.firebaseapp.com",
  databaseURL: "fir-playground-c7cd9.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
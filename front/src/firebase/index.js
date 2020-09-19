import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyC26b87Hnc3K7u7mLmDB9Q_r_kv5FPDvhI',
  authDomain: 'starts-279315.firebaseapp.com',
  databaseURL: 'https://starts-279315.firebaseio.com',
  projectId: 'starts-279315',
  storageBucket: 'starts-279315.appspot.com',
  messagingSenderId: '911402094578',
  appId: '1:911402094578:web:604493b8c34d9c59cea56b'
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
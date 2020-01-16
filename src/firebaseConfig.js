import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAVgGfPWlYUQCHaIZhE-mLP_dwxsWfx_x8",
    authDomain: "daj-pivo.firebaseapp.com",
    databaseURL: "https://daj-pivo.firebaseio.com",
    projectId: "daj-pivo",
    storageBucket: "daj-pivo.appspot.com",
    messagingSenderId: "394721960944",
    appId: "1:394721960944:web:573483f68351325f"
  };

export const myFirebase = firebase.initializeApp(config);

export default config;
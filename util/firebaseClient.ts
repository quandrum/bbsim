import firebase from 'firebase/app';
import 'firebase/auth';
import config from '../config.json';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: `${config.projectId}.firebaseapp.com`,
    databaseURL: `https://${config.projectId}.firebaseio.com`,
    projectId: config.projectId,
    storageBucket: `${config.projectId}.appspot.com`,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: 'G-2ML56PNX3V',
  });
}

export { firebase };

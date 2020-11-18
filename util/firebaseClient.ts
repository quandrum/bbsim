import firebase from 'firebase/app';
import 'firebase/auth';
import secrets from '../secrets.json';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: secrets.apiKey,
    authDomain: `${secrets.projectId}.firebaseapp.com`,
    databaseURL: `https://${secrets.projectId}.firebaseio.com`,
    projectId: secrets.projectId,
    storageBucket: `${secrets.projectId}.appspot.com`,
    messagingSenderId: secrets.messagingSenderId,
    appId: secrets.appId,
    measurementId: 'G-2ML56PNX3V',
  });
}

export { firebase };

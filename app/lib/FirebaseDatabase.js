import firebase from 'firebase/app';
import 'firebase/database';
import config from 'config';

const firebaseDevConfig = {
  apiKey: 'AIzaSyCB65yF1se5ubsQiFkIGYoFnuPSIBm84QM',
  authDomain: 'saturdaykids-1fc50.firebaseapp.com',
  databaseURL: 'https://saturdaykids-1fc50.firebaseio.com',
  projectId: 'saturdaykids-1fc50',
  storageBucket: 'saturdaykids-1fc50.appspot.com',
  messagingSenderId: '298770520772',
  appId: '1:298770520772:web:26e31d7c259a7bcc46c791',
};

const firebaseProdConfig = {
  apiKey: 'AIzaSyCB65yF1se5ubsQiFkIGYoFnuPSIBm84QM',
  authDomain: 'saturdaykids-1fc50.firebaseapp.com',
  databaseURL: 'https://saturdaykids-1fc50.firebaseio.com',
  projectId: 'saturdaykids-1fc50',
  storageBucket: 'saturdaykids-1fc50.appspot.com',
  messagingSenderId: '298770520772',
  appId: '1:298770520772:web:26e31d7c259a7bcc46c791',
};

if (!firebase.apps.length) {
  const currentConfig = config.getNodeEnv() === 'production'
    ? firebaseProdConfig : firebaseDevConfig;
  firebase.initializeApp(currentConfig);
}

const FirebaseDatabase = {
  init() {
    if (!firebase.apps.length) {
      const currentConfig = config.getNodeEnv() === 'production'
        ? firebaseProdConfig : firebaseDevConfig;
      firebase.initializeApp(currentConfig);
    }
  },
  pushDataTo({ path, data }) {
    firebase.database().ref(path).push(data);
  },
  writeDataTo({ path, data }) {
    firebase.database().ref(path).set(data);
  },
  readDataOnceFrom({ path }) {
    firebase.database().ref(path).once('value');
  },
  subscribeTo(path) {
    return firebase.database().ref(path);
  },
  subscribeAndFilterChildById(path) {
    return firebase.database().ref(path);
  },
  detachAllListeners() {
    firebase.database().ref().off();
  },
  unsubscribeFrom(path) {
    firebase.database().ref(path).off();
  },
  userPresence(userId) {
    const userStatusDatabaseRef = firebase.database().ref(`/status/${userId}`);

    const isOfflineForDatabase = {
      state: 'offline',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    const isOnlineForDatabase = {
      state: 'online',
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };

    firebase.database().ref('.info/connected').on('value', (snapshot) => {
      if (snapshot.val() === false) {
        return;
      }
      userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(() => {
        userStatusDatabaseRef.set(isOnlineForDatabase);
      });
    });
  },
  updateDataTo({ path, data }) {
    firebase.database().ref(path).update(data);
  },
  addDataTo({ path, data }) {
    firebase.database().ref(path).add(data);
  },
};
export default FirebaseDatabase;

import uuid from 'uuid/v1';
import firebase from 'firebase/app';
import 'firebase/storage';

const DEFAULT_PATH = 'files';

const config = {
  apiKey: 'AIzaSyAuZ0PFZwS4Dv6aaIpMhiETpnUCXgTiptk',
  authDomain: 'wunder-dev.firebaseapp.com',
  databaseURL: 'https://wunder-dev.firebaseio.com',
  projectId: 'wunder-dev',
  storageBucket: 'wunder-dev.appspot.com',
  messagingSenderId: '596174736831',
};


const Firebase = {
  init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  },
  uploadFile({
    name, file, customPath, onStateChange,
  }) {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const path = `${customPath || DEFAULT_PATH}/${name}`;
    const uploadTask = storageRef.child(path).put(file);

    return new Promise((onSuccess, onError) => uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      onStateChange,
      () => onError(uploadTask),
      () => onSuccess(uploadTask)
    ));
  },
  generateName(name) {
    return `${name}${uuid()}`;
  },
};

export default Firebase;

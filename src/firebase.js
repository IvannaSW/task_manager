import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAsKrD1LmWuqqUnmg9hKotA5iW-WHJaZDI",
  authDomain: "task-manager-45733.firebaseapp.com",
  databaseURL: "https://task-manager-45733.firebaseio.com",
  projectId: "task-manager-45733",
  storageBucket: "task-manager-45733.appspot.com",
  messagingSenderId: "293606961371",
  appId: "1:293606961371:web:bb27c710aa6decdadadcfe",
};

firebase.initializeApp(config);

// Get a reference to the database service
const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth};

import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBccogLRS34vE_MYfsEZjsv2hxpa3FWh4E",
  authDomain: "music-app-ca98f.firebaseapp.com",
  projectId: "music-app-ca98f",
  storageBucket: "music-app-ca98f.appspot.com",
  messagingSenderId: "917931185794",
  appId: "1:917931185794:web:525ae68cc024d46c45469b",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };

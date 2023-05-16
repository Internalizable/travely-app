import { initializeApp } from 'firebase/app';
import {getAuth, initializeAuth} from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native"
import { getStorage } from "firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage"

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

import {initializeFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdGvwLKDkeJ3Cg2nweqnPK05k8y4eCCaA",
    authDomain: "travely-ce1dd.firebaseapp.com",
    projectId: "travely-ce1dd",
    storageBucket: "travely-ce1dd.appspot.com",
    messagingSenderId: "156618765907",
    appId: "1:156618765907:web:9de0c05da2ba276cf6b8a6"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});

export const storage = getStorage(app);

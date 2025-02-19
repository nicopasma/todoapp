import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu0XCt7wBnM1MAtdFVyuvUBZN1yQL2D7M",
  authDomain: "todo-3ff2e.firebaseapp.com",
  projectId: "todo-3ff2e",
  storageBucket: "todo-3ff2e.firebasestorage.app",
  messagingSenderId: "1096841125105",
  appId: "1:1096841125105:web:c9978469d24e63a9ab5d50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const TODOS_REF = 'todos';
export const USERS_REF = 'users';

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
});
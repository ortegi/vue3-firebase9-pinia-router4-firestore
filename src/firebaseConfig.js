
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCchPQBhoFw_2pudyafUcgt-CgVMtvvl0c",
  authDomain: "vue3-firebase-9ad1e.firebaseapp.com",
  projectId: "vue3-firebase-9ad1e",
  storageBucket: "vue3-firebase-9ad1e.appspot.com",
  messagingSenderId: "781074084210",
  appId: "1:781074084210:web:99c9a09dc8a2dc2f3b6deb"
};


initializeApp(firebaseConfig);
const auth = getAuth()
export {auth}
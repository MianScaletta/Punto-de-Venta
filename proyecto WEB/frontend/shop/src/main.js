import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Comienza FireBase 
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOKa3_tT4HZGd0AXlXw7DDiUrgZ02HPas",
  authDomain: "programacionweb-4cf95.firebaseapp.com",
  projectId: "programacionweb-4cf95",
  storageBucket: "programacionweb-4cf95.appspot.com",
  messagingSenderId: "1063369120007",
  appId: "1:1063369120007:web:83a1640429bfcca2ec8da2"
};

// Initialize Firebase
initializeApp(firebaseConfig);
//Termina Fire Base




const app = createApp(App)

app.use(router)

app.mount('#app')

// Collez ici la configuration de votre application web Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy1Cpo56GZaQpmMqJKBjDmU0GEfZvIccM",
  authDomain: "facilite-35634.firebaseapp.com",
  projectId: "facilite-35634",
  storageBucket: "facilite-35634.firebasestorage.app",
  messagingSenderId: "723633592655",
  appId: "1:723633592655:web:1213e72ece176cb2b74d3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);// Adresse Gmail du tout premier chef de projet (elle crée son propre profil à la 1re connexion).
// La même adresse doit être mise dans firestore.rules.
export const CHEF_EMAIL ="daghboujeya0@gmail.com";

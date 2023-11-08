import { initializeApp } from "firebase/app";
const {
    uploadBytes,
    getStorage,
    ref,
    getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyCzVO4Qdqpew5C4yHPfD0y6tPgNby36dtU",
    authDomain: "ecommerce-a7061.firebaseapp.com",
    projectId: "ecommerce-a7061",
    storageBucket: "ecommerce-a7061.appspot.com",
    messagingSenderId: "473417194276",
    appId: "1:473417194276:web:748cc909500d0fec19b1b1",
    measurementId: "G-K83SYTXLP7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, uploadBytes, ref, getDownloadURL };

import { initializeApp } from "firebase/app";
const {
    uploadBytes,
    getStorage,
    ref,
    getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, uploadBytes, ref, getDownloadURL };

import { initializeApp } from "firebase/app";
const {
    uploadBytes,
    getStorage,
    ref,
    getDownloadURL,
} = require("firebase/storage");

const firebaseConfig = {
    apiKey: "AIzaSyDiwkDNiNvhqEXxhhK7cib6tal_uMhhDPY",
    authDomain: "mani-c739b.firebaseapp.com",
    projectId: "mani-c739b",
    storageBucket: "mani-c739b.appspot.com",
    messagingSenderId: "567685674406",
    appId: "1:567685674406:web:222268e1e393e502058b67",
    measurementId: "G-N6EPNQJG00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, uploadBytes, ref, getDownloadURL };

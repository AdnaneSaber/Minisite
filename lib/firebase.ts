// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef } from "firebase/storage";

import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHOLw6EZZ1nhEZsXnONE89ZrmIcqUvlaU",
    authDomain: "kalopsium.firebaseapp.com",
    databaseURL:
        "https://kalopsium-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "kalopsium",
    storageBucket: "kalopsium.appspot.com",
    messagingSenderId: "469311454409",
    appId: "1:469311454409:web:f1c672afa2fe14f21fa118",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);
const posts = ref(db, 'posts/')
const authors = ref(db, 'authors/')
const sizeStorageRef = ref(db, 'storage-size/')
const imageStorage = storageRef(storage, 'minisite/')

export { db, storage, posts, sizeStorageRef, imageStorage, authors };

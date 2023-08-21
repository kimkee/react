import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyBSaPFkAnkoc_uu_xR9LUvHL1Cc8mOWcyc",
    authDomain: "mybbs-5642f.firebaseapp.com",
    projectId: "mybbs-5642f",
    storageBucket: "mybbs-5642f.appspot.com",
    messagingSenderId: "210742350834",
    appId: "1:210742350834:web:a65b2a1d7d470593a3516b",
    databaseURL: "https://mybbs-5642f-default-rtdb.asia-southeast1.firebasedatabase.app/",
    measurementId: "G-SZ9V5BHSER"
};
/* const firebaseConfig = {
    apiKey: "AIzaSyCnYJTa63-PRm899pb_va79ndU68Jkt_r8",
    authDomain: "myworks-f1205.firebaseapp.com",
    projectId: "myworks-f1205",
    storageBucket: "myworks-f1205.appspot.com",
    messagingSenderId: "248734016315",
    appId: "1:248734016315:web:2259b601c7bd4ea68bcd1e",
    measurementId: "G-KE1P2B2HB8"
}; */
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);
console.log(database);


export {db,database};
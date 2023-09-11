
import {db} from './firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

let userData = {};

if ( sessionStorage?.user ) { 
  const userID = JSON.parse( sessionStorage?.user ).uid ;
  const docRef =  doc(db, "member" , userID);
  try {
    const docSnap = await  getDoc(docRef);
    
    console.log(docSnap.data());
    userData = docSnap.data()
  } catch(error) {
    console.log(error)
  }

}

export default userData;

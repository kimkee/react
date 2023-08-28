
import {db} from './firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { atom } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '2312312', // default value (aka initial value)
});
const sss = atom({
  key: 'sss', // unique ID (with respect to other atoms/selectors)
  default: {
    a:'1',
    b:'2'
  }, // default value (aka initial value)
});
window.sss = sss;
window.textState = textState;
export {sss,textState}
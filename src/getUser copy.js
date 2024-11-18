// getUser.js
import { db } from './firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { supabase } from '@/supabase.js';
// async 함수로 래핑
const getUser = async () => {
  let userData = {};
  let userID;
  if (sessionStorage?.user) { 
    userID = JSON.parse(sessionStorage?.user).uid;
  }else{
  
    const auth = getAuth();
    if (!userID) { return }
    onAuthStateChanged(auth, (authUser) => {
      userID = authUser.uid;
    });
  }
  
  
  const docRef = doc(db, "member", userID);
  try {
    const docSnap = await getDoc(docRef);
    // 사용자 데이터 반환
    userData = docSnap.data();
    userData.uid = userID;
    userData.stat = true;
  } catch (error) {
    console.error(error);
  }
 

  return userData; // 사용자 데이터 반환
};

export default getUser;

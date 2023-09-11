// getUserData.js
import { db } from './firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';

// async 함수로 래핑
const getUserData = async () => {
  let userData = {};

  if (sessionStorage?.user) {
    const userID = JSON.parse(sessionStorage?.user).uid;
    const docRef = doc(db, "member", userID);
    try {
      const docSnap = await getDoc(docRef);

      // 사용자 데이터 반환
      userData = docSnap.data();
    } catch (error) {
      console.error(error);
    }
  }

  return userData; // 사용자 데이터 반환
};

export default getUserData;


// import {db} from './firebaseConfig_bak.js';
// import { getDoc, doc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { atom } from 'recoil';

const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '2312312', // default value (aka initial value)
});
const store2 = atom({
  key: 'store2', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});
const sss = atom({
  key: 'sss', // unique ID (with respect to other atoms/selectors)
  default: {
    a:1,
    b:2
  } // default value (aka initial value)
});
const postCout = atom({
  key: 'postCout', // unique ID (with respect to other atoms/selectors)
  default: {
    scraps:0,
    reviews:0,
    posts:0
  } // default value (aka initial value)
});
const atomStore = atom({
  key: 'atomStore', // unique ID (with respect to other atoms/selectors)
  default: {
    state: {
      userInfo:{
        stat: false,
        uid: false,
        email: null,
        nick: null,
        avatar: null,
        liked: [],
      },
      avatar:[
        "https://cdn-icons-png.flaticon.com/128/3899/3899618.png",
        "https://cdn-icons-png.flaticon.com/128/805/805370.png ",
        "https://cdn-icons-png.flaticon.com/128/1154/1154448.png",
        "https://cdn-icons-png.flaticon.com/128/1211/1211015.png",
        "https://cdn-icons-png.flaticon.com/128/949/949635.png",
        "https://cdn-icons-png.flaticon.com/128/4322/4322992.png",
        "https://cdn-icons-png.flaticon.com/128/547/547413.png",
        "https://cdn-icons-png.flaticon.com/128/4322/4322991.png",
        "https://cdn-icons-png.flaticon.com/128/4202/4202843.png",
        "https://cdn-icons-png.flaticon.com/128/2589/2589136.png",
        "https://cdn-icons-png.flaticon.com/128/1785/1785918.png",
        "https://cdn-icons-png.flaticon.com/128/4139/4139993.png",
        "https://cdn-icons-png.flaticon.com/128/1154/1154473.png",
        "https://cdn-icons-png.flaticon.com/128/4532/4532510.png",
      ],
      todos : "fdsssssss", 
      saying : "sssssssss",
      count: 0,
    }
  }, // default value (aka initial value)
});


const authState = async ()=>{
  const auth = getAuth();
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      getUser(user);
      sessionStorage.setItem("user",JSON.stringify(user));
      return;
    }
    sessionStorage.removeItem("user");
    atomStore.state.userInfo = {};
    atomStore.state.userInfo.stat = false;
    console.log('logout 된 상태' , atomStore.state.userInfo);
    
  });
 
  const getUser = async (user)=>{
    const docRef =  doc(db, "member" , user.uid);
    try {
      const docSnap = await getDoc(docRef);
      atomStore.state.userInfo.stat = true;
      atomStore.state.userInfo.email = docSnap.data().email;
      atomStore.state.userInfo.avatar = docSnap.data().avatar;
      atomStore.state.userInfo.nick = docSnap.data().nick;
      atomStore.state.userInfo.uid = user.uid;
      atomStore.state.userInfo.liked = docSnap.data().liked || [];
      console.table(atomStore.state.userInfo);
    } catch(error) {
      console.log(error)
    }
  }
} 
export {sss, atomStore,textState, store2, postCout};
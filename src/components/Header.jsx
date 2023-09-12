
import React, {useState,  useEffect } from 'react'; //
import {Link, NavLink, useParams, useLocation, useNavigate} from 'react-router-dom'; // ,useParams,useLocation
import ui from '/src/ui.js';
import store from '../store.js';
import getUser from '../getUser.js';
import { getAuth, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
export default function Header({prop}) {
  let params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(params);
  location.pathname
  // console.log(params , location);
  const [userInfo, setUserInfo] = useState(store.state.userInfo);
  
  useEffect(() => {
    setUserInfo( prevUserInfo => ({ ...prevUserInfo, uid: sessionStorage.user && JSON.parse(sessionStorage.user).uid }));

    getUser().then((userData) => {
      // console.log(userData); // 얻은 사용자 데이터를 사용하세요
      setUserInfo(userData)
    });
    // const auth = getAuth();
    // onAuthStateChanged(auth, (authUser) => {
    //   if (authUser) {
    //     // 사용자가 로그인한 경우
    //     setUserInfo( prevUserInfo => ({ ...prevUserInfo, ...JSON.parse(sessionStorage.user) }))
    //   } else {
    //     // 사용자가 로그아웃한 경우
    //     // setUserInfo({ })
    //   }
    // });


    return ()=>{
      
    }
    
  },[userInfo?.uid,userInfo?.nick,userInfo?.displayName]);
  

  const test =()=>{
    ui.confirm("리액트 보다 쀼가 짱입니까?",{
      ycb:function(){
        console.log("컴펌 예");
        window.location.href = "https://kimkee.github.io/vue"
      },
      ncb:function(){
        console.log("컴펌 아뇨");
      },
      ybt:"마자요!",
      nbt:"아니오!",
    });
  }
  return (
	  <header className={`header ${prop.headerType}`}>
      <div className="inr">
        <div className="ldt">
         
          { prop.headerType == "main" 
            ? <h1 className="logo"> <Link to={`/home/`} className="btlogo"><i className="fa-brands fa-vuejs"></i></Link></h1> 
            : <button type="button" className="bt back" onClick={()=>navigate(-1)}><i className="fa-regular fa-arrow-left"></i>뒤로</button>
          }
          
          { params.id ? <h3 className="htit">{store.state.userInfo.nick}</h3> : null }

        </div>
        <div className="rdt">
           
          { ( store.state.userInfo.stat || userInfo?.uid) &&
            <NavLink to={`/user/${userInfo.uid}`} className={"user"}> 
              <span className="pic"><img alt="" className="img" src={ store.state.avatar[userInfo.avatar] || userInfo.photoURL} /></span>
              <span className="txt">{ userInfo.nick || userInfo.displayName}</span>
            </NavLink>
          }
          {!userInfo?.uid && <NavLink to={`/user/signin`} className={"bt"}><i className="fa-regular fa-user"></i><em>Login</em></NavLink>}
          
          
          <button type="button" onClick={test} className="bt gnb"><i className="fa-regular fa-bars"></i><b>메뉴</b></button>
        </div>
      </div>
    </header>
  )
}

import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams, useNavigate, useLocation } from 'react-router-dom';  // Link,useParams , useLocation, useSearchParams,


import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue, } from 'recoil';
import store from '../../store.js';
import {atomStore,textState,sss} from '../../atom.js';

// import axios from 'axios';
import ui from '../../ui.js';
import { supabase } from '@/supabase.js';



export default function UserFolw({uInfo,user,swiper}) {
  const [member, setMember] = useState();
  const members = async ()=>{
    const { data: members, error: membersError }  = await supabase.from('MEMBERS').select("*").order('created_at', { ascending: true });
    setMember(members);
  }
  function TextInput() {
    const [text, setText] = useRecoilState(textState);
    const [sssVal, setSssVal] = useRecoilState(sss);
    
  
    const onChange = (event) => {
      setText(event.target.value);
      
    };
  
    return (
      <div>
        <input type="text" value={text} onChange={onChange} />
        <br />
        Echo: {text}
        <br /> {sssVal.a}
        <br /> {sssVal.b}
        
      </div>
    );
  }
  const [atomStoreVal, setAtomStore] = useRecoilState(atomStore);


  useEffect( () => {
    members();
    return ()=>{

    }
    // eslint-disable-next-line
  });
  if(!member) return
  return (
    <>
      <div className="members">
        <ul className="mlist">
        {member.length > 0 ? member.map((data,num) =>{
            const imgpath = '//image.tmdb.org/t/p/w92';
            const img = imgpath + data.poster_path;
            const tit = data.title || data.name;
            return(
              <li key={data.id+'_'+num} data-id={data.id+'_'+num}>
                <Link to={`/user/${data.id}`} className='box'>
                  <span className="pic"><img alt="" className="img" src={ data.profile_picture} /></span>
                  <div className="name">{data.username}</div>
                </Link>
              </li>)
          })
        :
        <li className="nodata">
          <i className="fa-solid fa-person-digging"></i>
          <p>Work in Progress</p>
        </li>
        }
      </ul>
      </div>
      {/* <p style={{'text-align':'center'}}>
        {atomStoreVal.state.avatar.map( i=> <span style={{'width':'33%','display':'inline-block','text-align':'center'}} key={i}><img style={{'width':'50%','display':'inline-flex'}} src={i} /></span>)}
      </p> */}
    </>
  )
}
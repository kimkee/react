// getUser.js
import { db } from './firebaseConfig.js';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { supabase } from '@/supabase.js';
// async 함수로 래핑
const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) return
  const { data: myinfo, error: myinfoError }  = await supabase.from('MEMBERS').select("*").eq('user_id', user?.id).order('created_at', { ascending: true });
  return {user:user,myinfo:myinfo[0]}  // 사용자 데이터 반환
};

export default getUser;

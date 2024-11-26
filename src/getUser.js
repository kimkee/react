// getUser.js
import { supabase } from '@/supabase.js';
// async 함수로 래핑
const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  addUserToDatabase(user);
  if(!user) return
  const { data, error }  = await supabase.from('MEMBERS').select("*").eq('user_id', user?.id).order('created_at', { ascending: true });
  return {user:user,myinfo:data[0]}  // 사용자 데이터 반환
};



const addUserToDatabase = async (user) => {
  if (user) {
    // 기존 회원인지 확인
    const { data, error: fetchError } = await supabase
      .from('MEMBERS')
      .select('*')
      .eq('email', user.email);

    if (fetchError) {
      console.error('Error fetching user data:', fetchError);
      return;
    }

    if (data.length > 0) {
      console.log('Existing user:', data[0]);
      // 기존 회원인 경우, 추가 로직 수행하지 않음
      return;
    } else {
      // 새로운 회원인 경우, 추가
      const { data, error: insertError } = await supabase.from('MEMBERS').insert([
        {
          user_id: user.id,
          email: user.email,
          username: user.user_metadata.full_name || user.user_metadata.user_name,
          provider: user.app_metadata.provider,
          profile_picture : user.user_metadata.avatar_url,
          level : 10,
          created_at: new Date(),
        },
      ]);

      if (insertError) {
        console.error('Error inserting new user:', insertError);
        console.log(insertError.code);
        // alert(insertError.code)
        
      } else {
        console.log('User added successfully:', data);
      }
    }
  }
};

// addUserToDatabase()



export default getUser;

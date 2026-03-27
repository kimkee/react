import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase.js';

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auth 상태 변경을 리스닝하여 로그인이 완료되면 홈으로 리다이렉트
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          if (session) {
            navigate('/home', { replace: true });
          }
        }
      }
    );

    // 만약 이벤트 리스너가 작동하지 않거나, 잘못 접근한 경우를 대비한 폴백
    const timer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 2000);

    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="container page">
      <main className="contents">
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2>로그인 처리 중...</h2>
          <p>잠시만 기다려주세요.</p>
        </div>
      </main>
    </div>
  );
}

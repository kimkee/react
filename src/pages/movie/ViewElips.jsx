import React, { useEffect } from 'react';

export default function ViewElips({overview}) {

  useEffect(() => {
    togView.set();
    return () => {
    
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const togView = {
    evt:(e)=>{
      console.log(e.currentTarget);
      const btn = e.currentTarget;
      const box = btn.closest("[data-ui='elips']");
      if( box.classList.contains("open")) {
        btn.innerHTML  = '<span>더보기</span> <i class="fa-solid fa-caret-down"></i>';
        box.classList.remove("open");
      }else{
        btn.innerHTML  = '<i class="fa-solid fa-caret-up"></i> <span>숨기기</span>';
        box.classList.add("open");
      }
    },
    set:(e)=>{
      const txt = document.querySelector(".txt").offsetHeight ;
      const scHt = document.querySelector(".txt").scrollHeight;
      console.log("scHt == " , scHt, ".txt == " , txt );
      if (txt < scHt) {
        document.querySelector("[data-ui='elips']").classList.add("elips");
      }
    }
  }


  return (
    <div>
        <div className="vinf" data-ui='elips' > 
        {/* <div className="txt">블랙 팬서: 와칸다 포에버블랙 팬서: 와칸다 포에버블랙 팬서: 와칸다 포에버블랙 팬서: 와칸다 포에버블랙 팬서: 와칸다 포에버블랙 팬서: 와칸다 포에버블랙 팬서: 와칸다 </div> */}
        <div className="txt">{overview}</div>
        <button className="btn-tog" type="button" onClick={togView.evt}><span>더보기</span> <i className="fa-solid fa-caret-down"></i></button>
        </div>
    </div>
  )
}

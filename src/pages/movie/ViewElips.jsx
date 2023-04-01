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

      if( box.classList.contains("open") ) {
        btn.querySelector(".btn-tog").innerHTML  = '<span>더보기</span> <i class="fa-solid fa-caret-down"></i>';
        box.classList.remove("open");
      }else{
        btn.querySelector(".btn-tog").innerHTML  = '<i class="fa-solid fa-caret-up"></i> <span>숨기기</span>';
        box.classList.add("open");
      }
    },
    set:(e)=>{
      const txt = document.querySelector("[data-ui='elips'] .txt").offsetHeight ;
      const scHt = document.querySelector("[data-ui='elips'] .txt").scrollHeight;
      console.log("scHt == " , scHt, ".txt == " , txt );
      if (txt < scHt) {
        document.querySelector("[data-ui='elips']").classList.add("elips");
      }
    }
  }


  return (
    <div className="vinf" data-ui='elips' onClick={ togView.evt } onKeyUp={ e=> e.key ==="Enter" ? togView.evt(e) : null  } tabIndex={0}> 
      <div className="txt">
        {overview}
        <span className="btn-tog"><span>더보기</span> <i className="fa-solid fa-caret-down"></i></span>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react';

export default function ViewElips({overview}) {

  useEffect(() => {
    togView.set();
    return () => {
    
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const togView = {
    evt: (e) => {
      const btn = e.currentTarget;
      const box = btn.closest("[data-ui='elips']");
      const btnTogElem = btn.querySelector(".btn-tog");
      if (box.classList.contains("open")) {
        btnTogElem.innerHTML = '<span>더보기</span> <i class="fa-solid fa-caret-down"></i>';
        box.classList.remove("open");
      } else {
        btnTogElem.innerHTML = '<i class="fa-solid fa-caret-up"></i> <span>숨기기</span>';
        box.classList.add("open");
      }
    },
    set: (e) => {
      const elipsElem = document.querySelector("[data-ui='elips']");
      const txtElem = elipsElem.querySelector(".txt");
      const txtHeight = txtElem.offsetHeight;
      const scrollHeight = txtElem.scrollHeight;
  
      // console.log("scrollHeight == ", scrollHeight, ".txtHeight == ", txtHeight);
      if (txtHeight < scrollHeight) {
        elipsElem.classList.add("elips");
      }
    },
  };

  return (
    <div className="vinf" data-ui='elips' onClick={ togView.evt } onKeyUp={ e=> e.key ==="Enter" ? togView.evt(e) : null  } tabIndex={0}> 
      <div className="txt">
        {overview}
        <span className="btn-tog"><span>더보기</span> <i className="fa-solid fa-caret-down"></i></span>
      </div>
    </div>
  )
}

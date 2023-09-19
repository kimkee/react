
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

export default function Skeleton({ opts }) {

  const skeltList = [];

  if (opts.type == 'movie-list') {
    for (let i = 0; i <= opts.num; i++) {
      skeltList.push(
        <li key={i}>
          <div className="box">
            <div className="cont">
              <div className="pics"></div>
            </div>
            <div className="tits"></div>
          </div>
        </li>
      );
    }
  }
  if (opts.type == 'movie-detail') {
    skeltList.push(
      <div key={`i`} className="m-info skelt">
        <div className="info">
          <div className="desc">
            <p className="tit">&nbsp;</p>
            <p className="sit">&nbsp;</p>
            <p className="tio">&nbsp;</p>
            <div className="star">&nbsp;</div>
            <div className="cate">&nbsp;</div>
            <ul className="lst">
              <li className="vot">&nbsp;</li>
              <li className="opn">&nbsp;</li>
              <li className="tim">&nbsp;</li>
            </ul>
          </div>
          <div className="thum"><div className="pics"></div></div></div>
          <div className="sect cast">
            <h4 className="tts"></h4>
            <div className="lst">
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
            </div>
          </div>
          <div className="sect cast">
            <h4 className="tts"></h4>
            <div className="lst">
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
              <div className="profile">
                <div className="pics"></div> <div className="name"></div> <div className="carc"></div>
              </div>
            </div>
          </div>
          
      </div>
    );
  }

  return (skeltList)
}
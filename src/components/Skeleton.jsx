
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

export default function Skeleton({ opts }) {

  const skeltList = [];

  for (let i = 0; i <= opts.num; i++) {
    opts.type == 'movie-list' && skeltList.push(
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

  return (skeltList)
}
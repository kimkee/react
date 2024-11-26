
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

export default function Loading({ opts }) {
 

  return (
  <>
    { opts.type == 'glx' && 
    <span className={`ui-loading ui-load-glx ${opts.cls}`}>
      <span className="gbx">
          <em className="bx">
              <i></i> <i></i><i></i> <i></i>
          </em>
      </span>
    </span>}
    { opts.type == 'dot' && 
    <span className={`ui-loading ui-loading-dot ${opts.cls}`}>
      <div className="bx"><em><i></i></em></div>
    </span>}
  </>
  )
}
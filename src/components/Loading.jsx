
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // useParams , Outlet, useSearchParams, useLocation
import axios from 'axios';

export default function Loading({ opts }) {
 

  return (
  <>
    { opts.type = 'dot' && 
    <span className="ui-load-glx full">
      <span className="gbx">
          <em className="bx">
              <i></i> <i></i><i></i> <i></i>
          </em>
      </span>
    </span>}
  </>
  )
}
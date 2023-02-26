// import React, { useState, useEffect } from 'react';

import ProjectTop from "../components/HomeTop.jsx";
import { Outlet} from 'react-router-dom';  // useParams,Link,  useSearchParams, useLocation 

export default function HomeTop() {


  return (
	<>
		<Outlet />
	
		<div className="container page home">
			<main className="contents">
			<ProjectTop />
				
			</main>
		</div>
	</>
  )
}

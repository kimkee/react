import React from 'react'
import Data from 'https://api.themoviedb.org/3/discover/movie?api_key=f76021076e8162ea929bd2cea62c6646&language=ko&region=kr&page=1&sort_by=release_date.desc';

console.log(Data);


export default function List() {
  return (
	<div>List</div>
  )
}

const fs = require('fs');

const d = new Date();
let yy = d.getFullYear();
let mm = d.getMonth()+1;
let dd = d.getDate();
let hh = d.getHours();
let min = d.getMinutes();
let sec = d.getSeconds();

const digt = n=> n < 10 ? "0"+n : n ;
const ver = yy + digt(mm) + digt(dd) + digt(hh) + digt(min) + digt(sec);
console.log(ver);
// .env 파일에 변수를 설정합니다.
fs.writeFileSync('.env.production', `REACT_APP_VER=V${ver}`);
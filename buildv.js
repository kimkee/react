import fs from 'fs';

const d = new Date();
const yy = d.getFullYear();
const mm = d.getMonth()+1;
const dd = d.getDate();
const hh = d.getHours();
const min = d.getMinutes();
const sec = d.getSeconds();

const digt = n => n < 10 ? ".0"+n : "."+n ;
const ver = yy + digt(mm) + digt(dd) + digt(hh) + digt(min) + digt(sec);
console.log(ver);
// .env 파일에 변수를 설정합니다.
fs.writeFileSync('.env.production', `VITE_APP_VER='${ver}'`);
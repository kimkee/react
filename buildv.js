const fs = require('fs');

const d = new Date();
const ver = d.getFullYear()+""+(d.getMonth()+1) +""+ d.getDate() +""+ d.getHours() +""+ d.getMinutes() +""+ d.getSeconds();

// .env 파일에 변수를 설정합니다.
fs.writeFileSync('.env.production', `REACT_APP_VER=V${ver}`);
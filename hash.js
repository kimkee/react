const crypto = require('crypto');
const fs = require('fs');

// 16바이트(= 128비트)의 랜덤한 값을 생성합니다.
const buffer = crypto.randomBytes(16);

// 생성된 값을 hex 문자열로 변환합니다. 이때, hex 문자열의 길이는 32자리입니다.
const hexString = buffer.toString('hex');

// hex 문자열의 첫 16자리만 사용합니다.
const shortenedHash = hexString.slice(0, 16);

// .env 파일에 변수를 설정합니다.
fs.writeFileSync('.env', 
`PUBLIC_URL='./'
BUILD_PATH='./docs'
PORT='9007'
GENERATE_SOURCEMAP=false
BROWSER=none
REACT_APP_PUBLIC_URL='./'
REACT_APP_VERSION=$npm_package_version
REACT_APP_KEY='f76021076e8162ea929bd2cea62c6646'
REACT_APP_VER='v_${shortenedHash}'
`);
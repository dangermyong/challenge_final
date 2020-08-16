const body = document.querySelector("body");

const IMG_NUMBER = 6;


function paintImage(imgNumber) {
  body.style=`background-image: url('images/${imgNumber}.jpg')`
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
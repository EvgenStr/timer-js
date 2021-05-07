'use strict';


const btnStart = document.getElementById('start');
// const time = document.querySelector('.time');
const rootElem = document.querySelector('.timerWrap');

btnStart.addEventListener('click', start);

function start() {
  let start = Date.now();
  let current = 0;
  let interval = null;
  return function startTimer() {
    console.log(start)
  }
}
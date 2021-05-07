'use strict';


const btnStart = document.getElementById('start');
const btnReset = document.getElementById('reset');
const btnPause = document.getElementById('pause');
const btnResume = document.getElementById('resume');

const timeElem = document.querySelector('.time');
const rootElem = document.querySelector('.timerWrap');

let start = null;
let current = 0;
let interval = null;



btnStart.addEventListener('click', startTimer);
btnReset.addEventListener('click', resetTimer);
btnPause.addEventListener('click', pauseTimer);
btnResume.addEventListener('click', resumeTimer);

function startTimer() {
  start = Date.now();
  current = 0;
  interval = null;
  interval = setInterval(() => {
    current = Date.now() - start;
    setTime(current, timeElem);
    btnStart.hidden = true;
    btnPause.hidden = false;
    btnReset.hidden = false;
  });
}

function pauseTimer(e) {
  clearInterval(interval);
  e.target.hidden = true;
  btnResume.hidden = false;
}
function resetTimer(e) {
  clearInterval(interval);
  interval = null;
  start = null;
  current = null;
  btnStart.hidden = false;
  btnResume.hidden = true;
  btnPause.hidden = true;
  e.target.hidden = true;
  setTime(0, timeElem);
}
function resumeTimer(e) {
  btnPause.hidden = false;
  e.target.hidden = true;
  start = Date.now();
  let temp = current;
  interval = setInterval(() => {
    current = Date.now() - start+temp;
    setTime(current, timeElem);
    btnStart.hidden = true;
    btnPause.hidden = false;
    btnReset.hidden = false;
  });
}

function setTime(time, elem) {
  if (time === 0) {
    elem.innerText = `00:00:00.000`;
    return;
  }
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor(time / 60000);
  const seconds = ((time % 60000) / 1000).toFixed(0);
  const milliseconds = time % 1000;
  elem.innerText = `${hours}:${(minutes < 10 ? "0" : "") + minutes}:${(seconds < 10 ? "0" : "") + seconds}.${milliseconds}`;
}
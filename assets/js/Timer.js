'use strict';
class Timer {
  constructor(rootElement) {
    this.root = rootElement;
    this.start = null;
    this.current = 0;
    this.interval = null;
      }
  init() {
    this.btnStart = this.createElement('button', { classNames: ['start'], handlers: { click: this.startTimer } });
    this.btnReset = this.createElement('button', { classNames: ['reset'], handlers: { click: this.resetTimer }, attributes: { hidden: true } });
    this.btnPause = this.createElement('button', { classNames: ['pause'], handlers: { click: this.pauseTimer }, attributes: { hidden: true } });
    this.btnResume = this.createElement('button', { classNames: ['resume'], handlers: { click: this.resumeTimer }, attributes: { hidden: true } });
    this.spanTime = this.createElement('span', { classNames: ['time'] });
    this.spanTime.innerText = `00:00:00.000`;
    this.btnReset.innerText = `Reset`;
    this.btnStart.innerText = `Start`;
    this.btnPause.innerText = `Pause`;
    this.btnResume.innerText = `Start`;
    this.btnsWrap = this.createElement('div',
      { classNames: ['btns-wrap'] },
      this.btnPause, this.btnStart, this.btnReset, this.btnResume);
    return [this.spanTime, this.btnsWrap];

  }
  startTimer() {
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
  pauseTimer(e) {
    clearInterval(interval);
    e.target.hidden = true;
    btnResume.hidden = false;
  }
  resetTimer(e) {
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
  resumeTimer(e) {
    btnPause.hidden = false;
    e.target.hidden = true;
    start = Date.now();
    let temp = current;
    interval = setInterval(() => {
      current = Date.now() - start + temp;
      setTime(current, timeElem);
      btnStart.hidden = true;
      btnPause.hidden = false;
      btnReset.hidden = false;
    });
  }
  setTime(time, elem) {
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
  createElement(
    tagName,
    { classNames = [], handlers = {}, attributes = {} } = {},
    ...children
  ) {
    const elem = document.createElement(tagName);
    elem.classList.add(...classNames);
    for (const [attrName, attrValue] of Object.entries(attributes)) {
      elem.setAttribute(attrName, attrValue);
    }
    for (const [eventType, eventHandler] of Object.entries(handlers)) {
      elem.addEventListener(eventType, eventHandler);
    }
    elem.append(...children);
    return elem;
  }
}
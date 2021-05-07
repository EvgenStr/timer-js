'use strict';
class Timer {
  constructor(rootElement) {
    this.start = null;
    this.current = 0;
    this.interval = null;
    this.btnStart = this.createElement('button', { classNames: ['start'], handlers: { click: this.startTimer } });
    this.btnReset = this.createElement('button', { classNames: ['reset'], handlers: { click: resetTimer }, attributes: { hidden: true } });
    this.btnPause = this.createElement('button', { classNames: ['pause'], handlers: { click: pauseTimer }, attributes: { hidden: true } });
    this.btnResume = this.createElement('button', { classNames: ['resume'], handlers: { click: resumeTimer }, attributes: { hidden: true } });
    this.spanTime = this.createElement('span', { classNames: ['resume'], handlers: { click: resumeTimer }, attributes: { hidden: true } });
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
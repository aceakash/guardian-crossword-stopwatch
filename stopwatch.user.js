// ==UserScript==
// @name         Guardian Crossword Stopwatch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Stopwatch for timing how long solving a Guardian Crossword takes
// @author       Akash
// @match        https://www.theguardian.com/crosswords/quick/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let interval = setInterval(function () {
        if (isReady()) {
           clearInterval(interval);
           init()
           return
        }
    }, 100)

    let startTime = null

    function isReady() {
        const el = document.querySelector('.crossword__clue__text')
        return el != null && el.textContent != null && el.textContent.length != null && el.textContent.length > 0
    }

    function init() {
        let watchNode = document.createElement('div')
        watchNode.innerHTML = `
<div class="display">00:00</div>
<div>
  <button class="start">Start</button>
  <button class="stop">Stop</button>
  <button class="reset">Reset</button>
</div>
`

        const container = document.querySelector('#crossword')
        const grid = document.querySelector('.content__main')
        watchNode = container.insertBefore(watchNode, grid)
        watchNode.style.paddingLeft = "8.25rem"

        document.querySelector('button.start').onclick = start
        document.querySelector('button.stop').onclick = stop
        document.querySelector('button.reset').onclick = reset
    }

    function start() {
        if (startTime != null) {
          return
        }
        startTime = new Date()
    }

    function stop() {
        if (startTime == null) {
          return
        }
        let now = new Date()
        document.querySelector('.display').innerText = (now-startTime)
        startTime = null
    }

    function elapsedTime() {
        if (startTime == null) {
            return null
        }
        
    }

    function reset() {
        startTime = null
        document.querySelector('.display').innerText = '00:00'
    }


})();

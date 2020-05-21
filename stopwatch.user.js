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
    let updateInterval = null

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
        updateInterval = setInterval(updateElapsedTime, 500)
    }

    function stop() {
        if (startTime == null) {
          return
        }
        updateElapsedTime()
        startTime = null
        clearInterval(updateInterval)
        updateInterval = null
    }

    function updateElapsedTime() {
        if (startTime == null) {
            return null
        }
        let now = new Date()
        let elapsedMs = now - startTime
        let formattedTime = formatTime(elapsedMs)
        document.querySelector('.display').innerText = formattedTime
        return formattedTime
    }

    function formatTime(ms) {
        const fullSeconds = Math.round(ms/1000)
        const fullMinutes = Math.floor(fullSeconds/60)
        const seconds = fullSeconds%60

        const toLength2 = f => {
            if (f < 10) {
                return `0${f}`
            } else {
                return `${f}`
            }
        }

        return `${toLength2(fullMinutes)}:${toLength2(seconds)}`
    }

    function reset() {
        startTime = null
        clearInterval(updateInterval)
        updateInterval = null
        document.querySelector('.display').innerText = '00:00'
    }


})();

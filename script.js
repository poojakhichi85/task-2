// script.js
let timerInterval;
let elapsedTime = 0;
let isRunning = false;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

function startStopwatch() {
    timerInterval = setInterval(() => {
        elapsedTime += 10;
        updateDisplay();
    }, 10);
}

function stopStopwatch() {
    clearInterval(timerInterval);
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    lapTimes = [];
    updateDisplay();
    updateLapTimes();
}

function lapStopwatch() {
    lapTimes.push(elapsedTime);
    updateLapTimes();
}

function updateDisplay() {
    let milliseconds = parseInt((elapsedTime % 1000) / 10);
    let seconds = parseInt((elapsedTime / 1000) % 60);
    let minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
    let hours = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateLapTimes() {
    lapTimesList.innerHTML = '';
    lapTimes.forEach((time, index) => {
        let milliseconds = parseInt((time % 1000) / 10);
        let seconds = parseInt((time / 1000) % 60);
        let minutes = parseInt((time / (1000 * 60)) % 60);
        let hours = parseInt((time / (1000 * 60 * 60)) % 24);

        milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        hours = hours < 10 ? "0" + hours : hours;

        const li = document.createElement('li');
        li.innerText = `Lap ${index + 1}: ${hours}:${minutes}:${seconds}.${milliseconds}`;
        lapTimesList.appendChild(li);
    });
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
        startStopButton.textContent = 'Start';
    } else {
        startStopwatch();
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);

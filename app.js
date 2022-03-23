const lights = document.querySelectorAll('.light');
const timeDisplay = document.querySelector('#time');
const start = document.querySelector('#start');
const result = document.querySelector('#display-time');
const pageReload = document.querySelector('#reload');
let current = 0;
let startTime;
let endTime;
let potato = null;
let time0;
let time1;
let reactionTime;
let lightsOff;

document.addEventListener('click', startProcedure);
pageReload.addEventListener('click', refreshPage);

function refreshPage() {
  window.location.reload();
}

// Temporarily moved inside startProcedure function
// start.addEventListener('mousedown', getReactionTime);

// Get a random number between two numbers
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


function startProcedure() {
  document.removeEventListener('click', startProcedure);
  // startTime = Date.now();
  potato = setInterval(turnLightsOn, 1000);
}

function turnLightsOn() {
  
  lights[current].classList.replace('off', 'on');
  current += 1; 
  if (current === lights.length) {
    // endTime = Date.now();
    clearInterval(potato);
    // let timeElapsed = (endTime - startTime) / 1000;
    // timeDisplay.textContent = timeElapsed;

    let delay = getRandomNumber(4, 7);
    delay = Math.floor(delay * 1000);
    console.log(delay);

    lightsOff = setTimeout(turnLightsOff, delay);
    
    start.addEventListener('mousedown', getReactionTime);
  }
  console.log(current);
}

function turnLightsOff() {
  time0 = performance.now();
  lights.forEach(light => {
    light.classList.replace('on', 'off');
  })
  time1 = performance.now();

  // console.log(`It took ${time1 - time0} milliseconds to run the forEach function.`);
}

function getReactionTime() {
  reactionTime = performance.now();
  let userReaction = Math.floor(reactionTime - time0);
  if (isNaN(userReaction)) {
    window.clearTimeout(lightsOff);
    result.textContent = 'Jump start!';
    start.removeEventListener('mousedown', getReactionTime);
  } else {
    result.textContent = `Your reaction time was ${userReaction} milliseconds!`;
    start.removeEventListener('mousedown', getReactionTime);
  }

  pageReload.classList.replace('invisible', 'visible');
}
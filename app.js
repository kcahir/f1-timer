
(function () {

  const lights = document.querySelectorAll('.f1-timer-light');
  const start = document.querySelector('#f1-timer-start');
  const result = document.querySelector('#f1-timer-display-time');
  const pageReload = document.querySelector('#f1-timer-reload');
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

  // Get a random number between two numbers
  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }


  function startProcedure() {
    document.removeEventListener('click', startProcedure);
    potato = setInterval(turnLightsOn, 1000);
  }

  function turnLightsOn() {

    lights[current].classList.replace('f1-timer-off', 'f1-timer-on');
    current += 1;
    if (current === lights.length) {
      clearInterval(potato);

      let delay = getRandomNumber(4, 7);
      delay = Math.floor(delay * 1000);

      lightsOff = setTimeout(turnLightsOff, delay);

      start.addEventListener('mousedown', getReactionTime);
    }
  }

  function turnLightsOff() {
    time0 = performance.now();
    lights.forEach(light => {
      light.classList.replace('f1-timer-on', 'f1-timer-off');
    })
    time1 = performance.now();
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

    pageReload.classList.replace('f1-timer-invisible', 'f1-timer-visible');
  }

})()

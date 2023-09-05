let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTiemLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTiemLeft(secondsLeft);
  }, 1000);
}

function displayTwoDigits(number) {
  return `${(number + "").padStart(2, "0")}`;
}

function displayTiemLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${displayTwoDigits(minutes)}:${displayTwoDigits(
    remainderSeconds
  )}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(tiemstamp) {
  const end = new Date(tiemstamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${displayTwoDigits(
    adjustedHour
  )}:${displayTwoDigits(minutes)}`;
}

function startTimer() {
  timer(this.dataset.time);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", startTimer);
});
document.customForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mins = Number(e.target.childNodes[1].value);
  timer(mins * 60);
  e.target.reset();
});

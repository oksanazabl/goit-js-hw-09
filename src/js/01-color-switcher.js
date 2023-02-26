const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const backgroundColor = getRandomHexColor();
    document.body.style.backgroundColor = `${backgroundColor}`;
  }, 1000);
  startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    startBtn.disabled = false;
  }
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

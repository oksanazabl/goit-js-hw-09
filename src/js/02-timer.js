// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputData: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  min: document.querySelector('[data-minutes]'),
  sec: document.querySelector('[data-seconds]'),
};

// let timeId = null;

refs.button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let timeSelected = selectedDates[0].getTime();
    if (timeSelected < new Date()) {
      Notify.failure('Please, choose a future date');
      return;
    }
    Notify.success('Counter START');
    refs.button.disabled = false;
  },
};

flatpickr(refs.inputData, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function newTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.min.textContent = minutes;
  refs.sec.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function clickStart() {
  refs.button.disabled = true;
  let timerId = setInterval(() => {
    const diff = new Date(refs.inputData.value) - new Date();
    const timerOn = convertMs(diff);
    // console.log(timerOn);
    newTimer(timerOn);
    if (diff < 1000) {
      clearInterval(timerId);
      refs.buttonartBtn.disabled = false;
      refs.inputData.disabled = false;
    }
  }, 1000);
}

refs.button.addEventListener('click', clickStart);

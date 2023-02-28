import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormsubmit);

function onFormsubmit(event) {
  event.preventDefault();

  let delay = +event.target.delay.value;
  let step = +event.target.step.value;
  let amount = +event.target.amount.value;

  if ([delay, step, amount].find(value => value < 0)) {
    Notify.failure('Please, enter correct data > 0');
    return;
  }
  for (i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
function createPromise(position, delay) {
  return new Promise((response, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        response({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

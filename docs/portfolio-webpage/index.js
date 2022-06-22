const jitter = (element) => {
  var textChar = element.innerHTML.split('');
  letters = '';

  for (let i = 0; i < textChar.length; i++) {
    textChar[i] === ' '
      ? (letters += `<span>&nbsp;</span>`)
      : (letters += `<span>${textChar[i]}</span>`);
  }
  element.innerHTML = '';
  element.innerHTML = letters;
  let span = element.childNodes;
  for (let i = 0; i < span.length; i++) {
    span[i].style.animationDelay = `-${randNum(100, 8000)}ms`;
  }
};

const randNum = (min, max) => {
  return Math.trunc(Math.random() * (max - min) + min);
};

const elements = document.querySelectorAll('.jittery');
elements.forEach((element) => {
  jitter(element);
});

const navButtons = document.querySelectorAll('.nav-menu');
navButtons.forEach((element) => {
  element.addEventListener(onmouseover, jitter(element));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-from-bottom');
      return;
    }
  });
});

const observedEl = document.querySelectorAll('.fade-animate');
observedEl.forEach((element) => {
  observer.observe(element);
});

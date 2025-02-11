/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
let offsetText = document.querySelectorAll('h1.wp-block-hjude-character-shift');
const threshold = incriment => {
  let steps = [];
  let step = 0;
  while (step < 1) {
    steps.push(step);
    step += incriment;
  }
  return steps;
};
function linear(t, tMin, tMax, value1, value2) {
  if (t <= tMin) {
    return value1;
  } else if (t >= tMax) {
    return value2;
  } else {
    return value1 + (value2 - value1) * (t - tMin) / (tMax - tMin);
  }
}
function shifter(entry, from, to, order = "normal") {
  chars = entry.target.querySelectorAll('.charBox');
  let intersectionRatio = entry.intersectionRatio;
  let step = 1 / chars.length;
  let min = 0;
  let max = 1;
  if (order == 'normal') {
    for (i = chars.length - 1; i > -1; i--) {
      let rangeMin = min + step / 1.5 * (chars.length - i - 1);
      let rangeMax = max - step / 1.5 * i;
      let val = linear(intersectionRatio, rangeMin, rangeMax, from, to);
      chars[i].style.setProperty('transform', `translateY(${val}%)`);
      chars[i].style.setProperty('--min', rangeMin);
      chars[i].style.setProperty('--max', rangeMax);
    }
  } else if (order == 'reverse') {
    for (i = chars.length - 1; i > -1; i--) {
      let rangeMin = min + step / 1.5 * i;
      let rangeMax = max - step / 1.5 * (chars.length - i - 1);
      let val = linear(intersectionRatio, rangeMin, rangeMax, from, to);
      chars[i].style.setProperty('transform', `translateY(${val}%)`);
      chars[i].style.setProperty('--min', rangeMin);
      chars[i].style.setProperty('--max', rangeMax);
    }
    console.log('rev');
  }
}
let offsetTextObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let textOffset = -1;
      let fromTop = entry.boundingClientRect.top;
      let fromBottom = window.innerHeight - entry.boundingClientRect.bottom;
      if (fromTop > fromBottom) {
        //bottom intersection
        shifter(entry, -200, -100, 'reverse');
      } else if (fromBottom >= fromTop) {
        //top intersection
        shifter(entry, 0, -100);
      }
    }
  });
}, {
  threshold: threshold(0.0001),
  rootMargin: '-60px 0px -100px 0px'
});
offsetText.forEach(element => {
  offsetTextObserver.observe(element);
});
/******/ })()
;
//# sourceMappingURL=view.js.map
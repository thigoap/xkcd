let first = document.getElementById('first');
let prev = document.getElementById('prev');
let random = document.getElementById('random');
let next = document.getElementById('next');
let last = document.getElementById('last');

let title = document.getElementById('title');
let subtitle = document.getElementById('subtitle');
let comic = document.getElementById('comic');

let lastComic;
let comicNumber;

const getOnLoad = () => {
  event.preventDefault();
  getComic(comicNumber);
}

const getFirst = () => {
  comicNumber = 1;
  getComic(comicNumber);
}

const getPrev = () => {
  event.preventDefault();
  if (comicNumber <= 1) { return; } 
  else {
    comicNumber--;
  }
  getComic(comicNumber);
}

const getNext = () => {
  event.preventDefault();
  if (comicNumber >= lastComic) { return; } 
  else {
    comicNumber++;
  }
  getComic(comicNumber);
}

const getRandom = () => {
  event.preventDefault();
    let random = Math.floor(Math.random() * lastComic);
    comicNumber = random;
  getComic(comicNumber);
}

const getLast = () => {
  event.preventDefault();
  comicNumber = lastComic;
  getComic(comicNumber);
}

const getComic = (number) => {
  event.preventDefault();
  if (!number) { url = `https://xkcd.com/info.0.json` }
  else { url = `https://xkcd.com/${number}/info.0.json`; }
  console.log(url);
  fetch(url)
  .then ( response => response.json() )
  .then (result => {
    if (!number) { lastComic = result.num; } // only on load, to define last comic
    comicNumber = result.num;
    title.innerHTML = `${comicNumber} - ${result.title}`;
    subtitle.innerHTML = `<a target="blank" 
    href="https://xkcd.com/${comicNumber}/">(see the original at XKCD)</a>`;
    comic.style.maxWidth = '100%';
    comic.style.height = 'auto';
    comic.src = result.img; 
    console.log('result', result);
  });  
}

first.addEventListener('click', getFirst);
prev.addEventListener('click', getPrev);
random.addEventListener('click', getRandom);
next.addEventListener('click', getNext);
last.addEventListener('click', getLast);

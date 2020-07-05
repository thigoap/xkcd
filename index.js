let comic = '';
let currComic = '';
let lastComic = '';

let first = document.getElementById('first');
let prev = document.getElementById('prev');
let random = document.getElementById('random');
let next = document.getElementById('next');
let last = document.getElementById('last');

let title = document.getElementById('title');
let image = document.getElementById('comic');

const getComic = async () => fetch(`https://xkcd.thigoap.vercel.app/api/${comic}`)
.then(res => res.json())

const showComic = async () => {
  let comicJson = await getComic();
  title.innerHTML = `${comicJson.num} - ${comicJson.title}`;
  subtitle.innerHTML = `<a target="blank" 
  href="https://xkcd.com/${comicJson.num}/">(see the original at XKCD)</a>`;
  image.style.maxWidth = '100%';
  image.style.height = 'auto';
  image.src = comicJson.img;
  currComic = comicJson.num;
  if (comic === 'last') { lastComic = comicJson.num } // only on load, to define last comic
}

const getFirst = () => {
  event.preventDefault();
  if (currComic === 1) { return; }
  else {
    comic = 1;
    showComic();
  }
}

const getPrev = () => {
  event.preventDefault();
  if (currComic <= 1) { return; }
  else {
    comic = currComic - 1;
    showComic();
  }
}

const getRandom = () => {
  event.preventDefault();
  comic = Math.floor(Math.random() * lastComic);
  showComic();
}

const getNext = () => {
  event.preventDefault();
  if (currComic >= lastComic) { return; }
  else {
    comic = currComic + 1;
    showComic();
  }
}

const getLast = () => {
  event.preventDefault();
  if (currComic === lastComic) { return; }
  else {
    comic = lastComic;
    showComic();
  }
}

const getOnLoad = () => {
  comic = 'last';
  showComic();  
}

first.addEventListener('click', getFirst);
prev.addEventListener('click', getPrev);
random.addEventListener('click', getRandom);
next.addEventListener('click', getNext);
last.addEventListener('click', getLast);

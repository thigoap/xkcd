let comic = '';
let currComic = '';
let lastComic = '';

let first = document.getElementById('first');
let prev = document.getElementById('prev');
let random = document.getElementById('random');
let next = document.getElementById('next');
let last = document.getElementById('last');

let searchInput = document.getElementById('searchInput')
let lastInput = document.getElementById('lastComic')
let searchBtn = document.getElementById('searchBtn')

let title = document.getElementById('title');
let image = document.getElementById('comic');

const getComic = async () => fetch(`https://xkcd.thigoap.vercel.app/api/${comic}`)
  .then(res => res.json())

const showComic = async () => {
  let comicJson = await getComic();
  if (comicJson.img) {
    title.innerHTML = `${comicJson.num} - ${comicJson.title}`;
    subtitle.innerHTML =
    `<p style="display:flex;justify-content:center;">
      <a rel="noopener noreferrer" target="_blank" 
      href="https://xkcd.com/${comicJson.num}/">(see the original at XKCD)</a>
      <span style="margin-left:8px;margin-right:8px;">|</span>
      <a rel="noopener noreferrer" target="_blank" aria-label="link to share on twitter" href="https://twitter.com/intent/tweet?text=See this funny comic from XKCD - ${comicJson.title}
      &url=https://xkcd.com/${comicJson.num}/&hashtags=xkcd">
        <img style="width:20px;" src="twitter-icon.png" alt="twitter-share-icon">
      </a>
    </p>`;
    image.style.maxWidth = '100%';
    image.style.height = 'auto';
    image.src = comicJson.img;
    currComic = comicJson.num;
    if (comic === 'last') { // only on load, to define last comic
      lastComic = comicJson.num
      console.log('last comic defined', lastComic);
      lastInput.innerText = lastComic;
    } 
  } else {
    title.innerHTML = comicJson.errorMsg;
    subtitle.innerHTML = '';
    image.src = ''
    image.alt = '';
  }
}

const getOnLoad = () => {
  comic = 'last';
  showComic();  
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

const getSpecific = () => {
  event.preventDefault();
  comic = searchInput.value;
  showComic();
}

first.addEventListener('click', getFirst);
prev.addEventListener('click', getPrev);
random.addEventListener('click', getRandom);
next.addEventListener('click', getNext);
last.addEventListener('click', getLast);
searchBtn.addEventListener('click', getSpecific);

import List from './dist/bundle.js';


document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {

  } else {
    const list = new List();
    list.load();
  }
});

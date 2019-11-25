import List from './lib/list';
import Lectures from './lib/lectures';
import { clicked } from './lib/helpers';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  const button = document.querySelector('.button');
  const buttonHTML = button.querySelector('.button__Html');
  const buttonCSS = button.querySelector('.button__Css');
  const buttonJavascript = button.querySelector('.button__Javascript');
    

  if (isLecturePage) {
    const lecture = new Lectures();
    lecture.loadLecture();
  } else {
    const list = new List();
    list.load();
  }

  buttonHTML.addEventListener('click', clicked);
  
  buttonCSS.addEventListener('click', clicked);
  
  buttonJavascript.addEventListener('click', clicked);
});






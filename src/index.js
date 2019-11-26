import List from './lib/list';
import Lectures from './lib/lectures';



document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    const lecture = new Lectures();
    lecture.loadLecture();
  } else {
    const list = new List();
    list.load();
  }
})

import {el} from './helpers';


/**
 * 
 * Element maker for image
 */
export function makeImage(imagePath) {
  if(!imagePath) {
    return el('div');
  }

  const imageEl = el('img');
  imageEl.src = `${imagePath}`;
  imageEl.classList.add('thumbnail');
  return imageEl;
}

/*
* Element maker for title
*/
export function makeTitle(title, slug) {
  const link = el('a');
  link.href =  `fyrirlestur.html?slug=${slug}`;
  const titleEl = el('h2', title);
  link.appendChild(titleEl);
  return link;
}


/*
* Element maker for text
*/
export function makeText(text) {
  return el('p', text);
}

/*
* Element maker for category
*/
export function makeCategory(category) {
  return el('h3', category);
}
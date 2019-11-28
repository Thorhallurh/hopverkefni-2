import { el } from './helpers';


/**
 * Element maker fyrir image
 */
export function makeImage(image) {
  if (!image) {
    const gray = el('div');
    gray.classList.add('card__gray');
    return gray;
  }

  const imageEl = el('img');
  imageEl.src = `${image}`;
  imageEl.classList.add('thumbnail');
  return imageEl;
}

/*
* Element maker fyrir title
*/
export function makeTitle(title, slug) {
  const link = el('a');
  link.href = `fyrirlestur.html?slug=${slug}`;
  const titleEl = el('h2', title);
  link.appendChild(titleEl);
  return link;
}


/*
* Element maker fyrir text
*/
export function makeText(text) {
  const split = text.split('\n');
  const child = split.map((paragraph) => {
    const textEl = el('p', paragraph);
    textEl.classList.add('lecture__p');
    return textEl;
  });

  const content = el('text', ...child);
  return content;
}

/*
* Element maker fyrir category
*/
export function makeCategory(category) {
  return el('h3', category);
}

/*
 * Element maker fyrir quote
 */
export function makeQuote(quote) {
  const quoteEl = el('blockquote');
  quoteEl.classList.add('quote');
  const quoteText = makeText(quote.data);
  quoteText.classList.add('quote__data');

  const quoteAtt = makeText(quote.attribute);
  quoteAtt.classList.add('quote__attribute');

  quoteEl.appendChild(quoteText);
  quoteEl.appendChild(quoteAtt);

  return quoteEl;
}

/**
* Element maker fyrir heading
* */
export function makeHeading(size, heading) {
  return el(size, heading);
}

/*
* Element maker fyrir code
*/
export function makeCode(code) {
  const preEl = el('pre');
  const codeEl = el('code', code);
  preEl.appendChild(codeEl);
  return preEl;
}

/*
* Element maker fyrir youtube vídeó
*/
export function makeVideo(youtube) {
  const videoEl = el('iframe');
  videoEl.src = youtube;
  videoEl.frameborder = '0';
  videoEl.allowfullscreen = '0';
  return videoEl;
}

/*
* Element maker fyrir lista
*/
export function makeList(listitem) {
  return el('li', listitem);
}

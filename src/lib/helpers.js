/**
 * Hreinsa börn úr elementi
 *
 * @param {object} element Element sem á að hreinsa börn úr
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Búa til element og aukalega setja börn ef send með
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Börn fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

// hjálparfall til að útbúa cards-element
export function elCard(title, category, thumbnail) {
  const element = document.createElement('div');
  element.classList.add('list__card');
  const childTitle = document.createTextNode('p');
  childTitle.classList.add('title');
  childTitle.textContent = title;
  const childCat = document.createTextNode('p');
  childCat.classList.add('category');
  childCat.textContent = category;
  const childThumb = document.createElement('img');
  childCat.classList.add('thumbnail');
  childThumb.setAttribute('src', `/img/${thumbnail}`);
  element.appendChild(childThumb);
  element.appendChild(childCat);
  element.appendChild(childTitle);

  return element;
}

export function clicked(e) {
  const button = e.target;
  if (button.classList.contains('button__filter')) {
    button.classList.remove('button__filter');
  } else {
    button.classList.add('button__filter');
  }
}

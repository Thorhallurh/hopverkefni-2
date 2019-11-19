// fjarlægir öll börn elements
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// hjálparfall til að útbúa element
// þarf að sníða að okkar þörfum, staðla fyrir
// attributes sem við viljum vísa í og þannig, ekki búið
// eflaust best að búa til tvö föll, eitt fyrir forsíðu
// og annað fyrir fyrirlestrasíðu
export function elList(type, className, clickHandler) {
  const element = document.createElement(type);
  element.classList.add(className);
  if (clickHandler)
    element.addEventListener('click', clickHandler);
  return element;
}

export function elLecture(type, className, clickHandler) {
  const element = document.createElement(type);
  element.classList.add(className);
  if (clickHandler)
    element.addEventListener('click', clickHandler);
  return element;
}
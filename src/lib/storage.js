/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'finished_lecture';

/**
 * Sækir gögn úr localStorage.
 * @returns {array} fylki af lectures eða tóma fylkið ef ekkert vistað.
 */
export function loadSaved() {
  const finishedLectures = localStorage.getItem(LOCALSTORAGE_KEY);
  const finished = JSON.parse(finishedLectures) || [];

  return finished; 

}

export function save(slug) {
  const saved = loadSaved();
  const index = saved.indexOf(slug);

  if(index >= 0) {
    saved.splice(index, 1);
  } else {
    saved.push(slug);
  }


  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
  
}

export function remove(slug) {
  const saved = loadSaved();
  const index = saved.indexOf(slug);
  
  if (index > -1) {
    saved.splice(index, 1);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(saved));
}
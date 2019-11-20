/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'finished_lecture';

/**
 * Sækir gögn úr localStorage.
 * @returns {array} fylki af lectures eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const finishedLectures = localStorage.getItem(LOCALSTORAGE_KEY);
  const finished = JSON.parse(finishedLectures) || [];

  return finished; 

}

export function save(slug) {
  const finishedLectures = load();
  if(!finishedLectures.includes(slug)) {
    finishedLectures.push(slug);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(finishedLectures));
  
}
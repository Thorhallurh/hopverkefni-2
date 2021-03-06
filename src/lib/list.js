import { empty, el, clicked } from './helpers';
import { makeImage, makeTitle } from './maker';

const filters = [];

export default class List {
  constructor() {
    this.container = document.querySelector('.cards');
    this.jsonfile = './lectures.json';
  }

  load() {
    function toggleFilter(string) {
      if (filters.includes(string)) {
        filters.splice(filters.indexOf(string), 1);
      } else {
        filters.push(string);
      }
    }

    document.querySelector('.button__Html').addEventListener('click', (e) => {
      clicked(e);
      toggleFilter('html');
      this.fetchData();
    });

    document.querySelector('.button__Css').addEventListener('click', (e) => {
      clicked(e);
      toggleFilter('css');
      this.fetchData();
    });

    document
      .querySelector('.button__Javascript')
      .addEventListener('click', (e) => {
        clicked(e);
        toggleFilter('javascript');
        this.fetchData();
      });

    empty(this.container);
    this.fetchData();
  }

  /*
   * Nær í gögn
   */
  fetchData() {
    fetch('./lectures.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
        return response.json();
      })
      .then((data) => {
        const lectures = data[Object.keys(data)[0]];
        const filteredLectures = lectures.filter((value) => {
          const chosenLect = filters.indexOf(value.category) !== -1;
          return chosenLect;
        });
        if (filters.length === 0) {
          empty(this.container);
          lectures.forEach((item) => {
            this.getCard(item);
          });
        } else {
          empty(this.container);
          filteredLectures.forEach((item) => {
            this.getCard(item);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /*
   * Býr til thumbnail fyrir hvern og einn fyrirlestur
   */
  getCard(item) {
    // Div fyrir öll gögnin
    const card = el('a');
    const addOnURL = `fyrirlestur.html?slug=${item.slug}`;
    const currentURL = window.location.href;
    if (currentURL.includes('index.html')) {
      card.href = currentURL.replace('index.html', addOnURL);
    } else {
      card.href = addOnURL;
    }
    card.classList.add('card');
    this.container.appendChild(card);

    // Thumbnail fyrir fyrirlestur
    const img = makeImage(item.thumbnail);
    card.appendChild(img);

    // Div fyrir flokk og titil
    const titlecatdiv = el('div');
    titlecatdiv.classList.add('card__titlecat');
    card.appendChild(titlecatdiv);

    // Div fyrir title og flokk í sitthvoru lagi
    // víxlaði til að setja div í rétta röð upp á útlit
    const catdiv = el('div');
    catdiv.classList.add('card__category');
    titlecatdiv.appendChild(catdiv);
    const cat = el('h3', item.category);
    cat.classList.add('card__h3');
    catdiv.appendChild(cat);

    const titlediv = el('div');
    titlediv.classList.add('card__title');
    titlecatdiv.appendChild(titlediv);
    const title = makeTitle(item.title, item.slug);
    titlediv.appendChild(title);

    if (localStorage.getItem(item.slug) === 'done') {
      const checkMark = el('div', '✓');
      checkMark.classList.add('card__finished');
      card.appendChild(checkMark);
    }
  }
}

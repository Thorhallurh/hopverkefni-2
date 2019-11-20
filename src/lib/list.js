import { empty, elCard } from './helpers';

let cardArray = [];

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.button = document.querySelector('.button');
    this.jsonfile = './lectures.json';
  }

  load() {
    empty(this.container);
    this.fetchData();

    //Eh sem sækir í this.jsonfile (lista)
    //Eh sem býr til elementin - thumbnailin
    //Eh sem birtir gögn

    // þarf að skoða betur hvernig parse virkar, hvernig við
    // vísum í hvert element í lectureCards og hvernig við
    // búum síðan til element úr því. Mér datt í hug að við
    // gætum bara byrjað á því að skrifa fyrir öll category
    // og síðan hent argument inn í load fyrir hvern button,
    // þ.e.a.s. load(css) væri ClickHandler fyrir CSS button
    // o.s.frv. Ég veit ekki hvort það sem er að neðan er
    // vitrænt... Þurfti bara að hlaupa áður en ég komst lengra.
    /*lectureCards = JSON.parse("lectures.json");
    let slugs = lectureCards.slug;
    if(lectureCards.category = html) {
      for(slug of slugs) {

      }

    }*/

    //const card = elList('div', 'list__card', getData);
  }

  //Eh sem filtrar ef ýtt er á hnapp
  filter() {
    //Eh sem filtrar ef ýtt er á hnapp
  }

  //býr til nýtt kort með elCard og bætir því inn í listann í DOM
  getCards(e) {
    e.forEach( () => {
      elCard(e.title, e.category, e.thumbnail, e.slug);
      document.querySelector('.list').appendChild(elCard);
    })
  };

  

  //þarf að vinna betur í að fá response.lectures (sem er object - ég hélt lengi að 
  //það væri array) til að virka utan promise. Þetta er örugglega ekkert mál á endanum,
  //ég bara elti nokkrar vitlausar kanínur niður vitlausar kanínuholur...)

  // hér er möguleg kanínuhola til að vinna með þetta og góðar hugmyndir í hliðarpanelnum líka: 
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  fetchData() {
    fetch('./lectures.json')
      .then((response) => {
        if(!response.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
          return response.json();
      })
      .then((response) => {
        //virkar ekki
        cardArray.slice(Object.keys(response.lectures))
      })
      .then(console.log(cardArray))
      .catch((error) => {
        console.log(error);
      });
    }

}

// kóði sem hann Gunni dæmatímakennari skrifaði, ákvað bara að taka hann niður

    const s = window.location.search;

    let x = new URLSearchParams(s);

    x.get("slug");
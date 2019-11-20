import { empty, el } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.button = document.querySelector('.button');
    this.jsonfile = './lectures.json';
  }

  load() {
    empty(this.container);
    this.fetchData();
    this.getCards();
    this.appendCards();

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


  fetchData() {
    fetch('./lectures.json')
      .then((response) => {
        if(!response.ok) {
          throw new Error('Gat ekki sótt fyrirlestra');
        }
          return response.json();
      }).then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      })
  }

  getCards() {

  }

  appendCards() {

  }

  displayData(lectureList) {

  }


  displayError(error) {

  }



}


const s = window.location.search;

let x = new URLSearchParams(s);

x.get("slug");
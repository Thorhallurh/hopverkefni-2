import { empty, elList, elLecture } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  load() {
    empty(this.container);
    // þarf að skoða betur hvernig parse virkar, hvernig við
    // vísum í hvert element í lectureCards og hvernig við
    // búum síðan til element úr því. Mér datt í hug að við
    // gætum bara byrjað á því að skrifa fyrir öll category
    // og síðan hent argument inn í load fyrir hvern button,
    // þ.e.a.s. load(css) væri ClickHandler fyrir CSS button
    // o.s.frv. Ég veit ekki hvort það sem er að neðan er
    // vitrænt... Þurfti bara að hlaupa áður en ég komst lengra.
    lectureCards = JSON.parse("lectures.json");
    let slugs = lectureCards.slug;
    if(lectureCards.category = html) {
      for(slug of slugs) {

      }

    }
  }
}

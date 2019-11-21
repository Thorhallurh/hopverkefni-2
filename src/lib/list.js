import { empty, el} from './helpers';
import { makeImage, makeTitle } from './maker';

export default class List {
  constructor() {
    this.container = document.querySelector('.cards');
    this.button = document.querySelector('.button');
    this.jsonfile = '../../lectures.json';
  }

  load() {
    empty(this.container);
    this.fetchData()
  }


  fetchData() {
    fetch(this.jsonfile)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Gat ekki sótt fyrirlestra'); 
        }
        return response.json();
      })
      .then((data) => {
        this.getCards(data);
      }) 
      .catch((error) => {
        console.error(error);
      }) 
  }

  getCards(data) {
    console.log(data)
    data.lectures.map((item) => {
      this.getCard(item);
    });
  }

  getCard(item) {
    const card = el('div');
    card.className = `card ${item.category}`;

    const img = makeImage(item.thumbnail);
    card.appendChild(img);

    const title = makeTitle(item.title, item.slug);
    title.className = 'card__title';
    card.appendChild(title);

    const link = el('a', img, title);
    link.setAttribute('href', `./fyrirlestur.html?slug=${item.slug}`);
    card.append(link);

    this.container.appendChild(card);

  }

  
}

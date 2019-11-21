import { empty, el} from './helpers';
import { makeImage, makeTitle, makeCategory } from './maker';
import { loadSaved } from './storage';

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
    const cards = data.lectures.map((item) => {
      const col = el('div', this.getCard(item));
      col.classList.add('cards__col');
    });

    const row = el('div', ...cards);
    row.classList.add('cards__row');

  }

  getCard(item) {

    //Div fyrir öll gögnin 
    const card = el('div');
    card.classList.add('card');
    this.container.appendChild(card);

    //Thumbnail fyrir fyrirlestur
    const img = makeImage(item.thumbnail);
    card.appendChild(img);

    //Textadiv utan um annað en mynd
    const textdiv = el('div');
    textdiv.classList.add('card__text');
    card.appendChild(textdiv);

    //Div fyrir flokk og titil
    const titlecatdiv = el('div');
    titlecatdiv.classList.add('card__titlecat');
    card.appendChild(titlecatdiv);
    
    //Div fyrir title og flokk í sitthvoru lagi
    const titlediv = el('div');
    titlediv.classList.add('title');
    titlecatdiv.appendChild(titlediv);
    const title = makeTitle(item.title, item.slug);
    titlediv.appendChild(title);

    const catdiv = el('div');
    catdiv.classList.add('category');
    titlecatdiv.appendChild(catdiv);
    const cat = makeCategory(item.category);
    catdiv.appendChild(cat);

    //Tjékkar ef fyrirlestur er búinn og bætir við check-merki
    if(loadSaved().includes(item.title)) {
      const checked = el('div', '✓');
      checked.classList.add('card__finished');
      titlecatdiv.appendChild(checked);    
    }

  }

  
}

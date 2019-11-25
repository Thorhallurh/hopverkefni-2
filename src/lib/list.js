
import { empty, el} from './helpers';
import { makeImage, makeTitle, makeCategory } from './maker';
import { loadSaved } from './storage';


export default class List {
  constructor() {
    this.container = document.querySelector('.cards');
    this.jsonfile = '../../lectures.json';

  }

  load() {
    empty(this.container);
    this.fetchData();
  }

  /*
  * Nær í gögn 
  */
  fetchData() {
    fetch('./lectures.json')
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

  /*
  * Mappar gögnin í JSON og býr til col og row
  */
  getCards(data) {
    console.log(data)
    const cards = data.lectures.map((item) => {
      const col = el('div', this.getCard(item));
      col.classList.add('cards__col');
      this.container.appendChild(col);
    });

    const row = el('div', ...cards);
    row.classList.add('cards__row');
    this.container.appendChild(row);

  }

  /*
  * Býr til thumbnail fyrir hvern og einn fyrirlestur
  */
  getCard(item) {

    //Div fyrir öll gögnin 
    const card = el('div');
    card.classList.add('card');
    this.container.appendChild(card);

    //Thumbnail fyrir fyrirlestur
    const img = makeImage(item.thumbnail);
    card.appendChild(img);

    //Div fyrir flokk og titil
    const titlecatdiv = el('div');
    titlecatdiv.classList.add('card__titlecat');
    card.appendChild(titlecatdiv);
    
    //Div fyrir title og flokk í sitthvoru lagi
    //víxlaði til að setja div í rétta röð upp á útlit
    const catdiv = el('div');
    catdiv.classList.add('category');
    titlecatdiv.appendChild(catdiv);
    const cat = makeCategory(item.category);
    catdiv.appendChild(cat);

    const titlediv = el('div');
    titlediv.classList.add('title');
    titlecatdiv.appendChild(titlediv);
    const title = makeTitle(item.title, item.slug);
    titlediv.appendChild(title);

    //Tjékkar ef fyrirlestur er búinn og bætir við check-merki
    if(loadSaved().includes(item.title)) {
      const checked = el('div', '✓');
      checked.classList.add('card__finished');
      titlecatdiv.appendChild(checked);    
    }

  }

}



import { empty, el, clicked} from './helpers';
import { makeImage, makeTitle, makeCategory } from './maker';
import { loadSaved } from './storage';

const filters = [];

export default class List {
  constructor() {
    this.container = document.querySelector('.cards');
    this.jsonfile = '../../lectures.json';

  }
  

  load() {
    document.querySelector('.button__Html').addEventListener('click', (e) => {
      clicked(e);
      toggleFilter("html");
      this.fetchData();
    });
    
    document.querySelector('.button__Css').addEventListener('click', (e) => {
      clicked(e);
      toggleFilter("css");
      this.fetchData();
    });
  
    document.querySelector('.button__Javascript').addEventListener('click', (e) => {
      clicked(e);
      toggleFilter("javascript");
      this.fetchData();
    });

    function toggleFilter (string) {
      if (filters.includes(string)) {
        filters.splice(filters.indexOf(string),1);
      } else {
        filters.push(string);
      }
    }

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
        let lectures = data[Object.keys(data)[0]];
        let filteredLectures = lectures.filter(function(value){
          return filters.indexOf(value.category) !== -1;
        });
        if (filters.length == 0) {
          empty(this.container);
          lectures.forEach((item) => {
            this.getCard(item)
          });
        } else {
          empty(this.container);
          filteredLectures.forEach((item) => {
            this.getCard(item)
          });
        }
      }) 
      .catch((error) => {
        console.error(error);
      }) 
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

    /*//Tjékkar ef fyrirlestur er búinn og bætir við check-merki
    if(loadSaved().includes(slug)) {
      const checked = el('div', '✓');
      checked.classList.add('card__finished');
      titlecatdiv.appendChild(checked);    
    }*/

  }

}


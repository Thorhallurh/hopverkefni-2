import {empty, el} from './helpers';
import {save, load} from './storage';
import {makeTitle, makeImage, makeText, makeCategory} from './maker';


export default class Lectures {
  constructor() {
    this.container = document.querySelector('.lecture-page');
    this.jsonfile = './lectures.json';
  }

  /**
   * Leitar í json (lectures) eftir slug, 
   * @param {*} slug 
   */
  loadOne(slug) {
    fetch(this.jsonfile)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Gat ekki sótt gögn');
      })
      .then((data) => {
        const picked = data.lectures.find(i => i.slug === slug);
        if(!picked) {
          throw new Error('Fyrirlestur finnst ekki');
        }
      })
      .catch((error) => {
        console.log(error);
      });   

      return picked;
  }

  /**
   * Maps all data in JSON file
   */
  mapData(data) {
    data.content.map((item) => {
      this.getItem(item);
      return true;
    })
  }

  /**
   * Checks every item in chosen lecture array. 
   */
  getItem(item) {

    const title = document.querySelector('.header__title');
    title.appendChild(item.title);
    const category = document.querySelector('.header__category');
    category.appendChild(item.category);
    
  }





  /**
   * Loads a lecture
   */
  load() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    this.loadOne(slug)
      .then(data => this.mapData(data));
  }

}

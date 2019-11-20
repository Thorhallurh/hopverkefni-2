import {empty, el} from './helpers';
import {save, load} from './storage';


export default class Lectures {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.jsonfile = 'lectures.json';
  }

  loadOne(slug) {
    fetch(this.jsonfile)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt gögn');
        }
        return response.json();
      })
      .then((data) => {
        const picked = data.lectures.find(i => i.slug === slug);
        if(!picked) {
          throw new Error('Finnur ekki fyrirlestur');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  






}
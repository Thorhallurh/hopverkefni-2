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
        if (response.ok) {
          return response.json();
        }
        throw new Error('Gat ekki sótt gögn');
      })
      .then((data) => {
        //Ná í gögn eftir nafni
      })
      .catch((error) => {
        displayError('Villa við að sækja gögn');
        console.log(error);
      });



  }






}
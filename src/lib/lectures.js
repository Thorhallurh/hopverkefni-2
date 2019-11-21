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
        createOne(data, slug);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createOne(data, slug) {
    

  }

  loadLecture() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    this.loadOne(slug);
  }

  






}
import {empty, el} from './helpers';
<<<<<<< HEAD
import {save, load} from './storage';
import {makeTitle, makeImage, makeText, makeCategory} from './maker';
=======
import {save, loadSaved} from './storage';
import {makeImage, makeText, makeQuote, 
  makeHeading, makeList, makeCode, makeVideo, makeCategory, makeTitle} from './maker';
>>>>>>> e73592bfe622a8e509723db92a0a2cb2758fbc44


export default class Lectures {
  constructor() {
<<<<<<< HEAD
    this.container = document.querySelector('.lecture-page');
    this.jsonfile = './lectures.json';
  }

  /**
   * Leitar í json (lectures) eftir slug, 
   * @param {*} slug 
   */
  loadOne(slug) {
    fetch(this.jsonfile)
=======
    this.container = document.querySelector('.lecture');
    this.jsonfile = '../../lectures.json';
    this.header = document.querySelector('.header');
  }

  fetchLecture(slug) {
    return fetch(this.jsonfile)
>>>>>>> e73592bfe622a8e509723db92a0a2cb2758fbc44
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt gögn');
        }
        return response.json();
      })
      .then((data) => {
        const picked = data.lectures.find(i => i.slug === slug);
        if(!picked) {
<<<<<<< HEAD
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
=======
          throw new Error('Fyrirlestur fannst ekki');
        }


        //Header
        const headerCat = makeCategory(picked.category);
        headerCat.classList.add('header__category');
        const headerTitle = el('h2', picked.title);
        headerTitle.classList.add('header__title');
        const headerContent = el('div', headerCat, headerTitle);
        headerContent.classList.add('header__content');
        this.header.appendChild(headerContent);

        if(picked.image) {
          this.header.style.backgroundImage = `url(${picked.image})`;
        }

        return picked;

      });

  }

  getLectures(data) {
    data.content.map((item) => {
      this.createLecture(item);
    }); 
  }

  createLecture(item) {

    if(item.type === 'image') {
      this.imageItem(item);
    } else if(item.type === 'text') {
      const textEl = makeText(item.data);
      textEl.classList.add('text');
      this.container.appendChild(textEl);
    } else if(item.type === 'quote') {
      const quoteEl = makeQuote(item);
      this.container.appendChild(quoteEl);
    } else if(item.type === 'heading') {
      const headingEl = makeHeading('h2', item.data);
      this.container.appendChild(headingEl);
    } else if(item.type === 'list') {
      this.listItem(item);
    } else if(item.type === 'code') {
      const codeEl = makeCode(item.data);
      codeEl.classList.add('code');
      this.container.add('code');
    } else if(item.type === 'youtube') {
      const videoEl = makeVideo(item.data);
      videoEl.classList.add('youtube');
      this.container.appendChild(videoEl);
    }
 
  }

  imageItem(item) {
    const imgEl = makeImage(item.data);
    const imgCap = el('p');
    imgCap.classList.add('image__caption');
    imgCap.appendChild(document.createTextNode(item.caption));
    this.container.appendChild(imgEl);
    this.container.appendChild(imgCap);
  }

  listItem(item) {
    const listEl = el('ul');
    listEl.classList.add('list');

    for(let i = 0; i < item.data.length; i++) {
      const lItem = makeList(item.data[i]);
      lItem.classList.add('list__item');
      listEl.appendChild(lItem);
      this.container.appendChild(listEl);
    }

>>>>>>> e73592bfe622a8e509723db92a0a2cb2758fbc44
  }


  loadLecture() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    this.fetchLecture(slug)
    .then(data => this.getLectures(data));
  }


}


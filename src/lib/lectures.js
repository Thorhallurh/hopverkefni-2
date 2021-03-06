import { el } from './helpers';
import {
  makeImage, makeText, makeQuote, makeHeading, makeList, makeCode, makeVideo, makeCategory,
} from './maker';

export default class Lectures {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.jsonfile = './lectures.json';
    this.header = document.querySelector('.lectHeader');
    this.footer = document.querySelector('.footer');
    this.finishButton = document.querySelector('.buttons__finish');
  }

  /*
  * Nær í gögn út frá slug, býr til header með réttum titli, cat og mynd.
  */
  fetchLecture(slug) {
    return fetch(this.jsonfile)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gat ekki sótt gögn');
        }
        return response.json();
      })
      .then((data) => {
        const picked = data.lectures.find(i => i.slug === slug);
        if (!picked) {
          throw new Error('Fyrirlestur fannst ekki');
        }

        // Header
        const headerCat = makeCategory(picked.category);
        headerCat.classList.add('lectHeader__category');
        const headerTitle = el('h2', picked.title);
        headerTitle.classList.add('lectHeader__title');
        const headerContent = el('div', headerCat, headerTitle);
        headerContent.classList.add('lectHeader__content');
        this.header.appendChild(headerContent);

        if (picked.image) {
          this.header.style.backgroundImage = `url(${picked.image})`;
        }

        return picked;
      });
  }

  /*
  * Mappar gegnum öll JSON gögnin
  */
  getLectures(data) {
    data.content.map((item) => {
      const lectureMap = this.createLecture(item);
      return lectureMap;
    });
  }

  /*
  * Setur upp fyrirlestur - sýnir öll item
  */
  createLecture(item) {
    if (item.type === 'image') {
      this.imageItem(item);
    } else if (item.type === 'text') {
      const textEl = makeText(item.data);
      textEl.classList.add('lecture__text');
      this.container.appendChild(textEl);
    } else if (item.type === 'quote') {
      const quoteEl = makeQuote(item);
      this.container.appendChild(quoteEl);
    } else if (item.type === 'heading') {
      const headingEl = makeHeading('h2', item.data);
      headingEl.classList.add('lecture__heading');
      this.container.appendChild(headingEl);
    } else if (item.type === 'list') {
      this.listItem(item);
    } else if (item.type === 'code') {
      const codeEl = makeCode(item.data);
      codeEl.classList.add('lecture__code');
      this.container.appendChild(codeEl);
    } else if (item.type === 'youtube') {
      const videoEl = makeVideo(item.data);
      videoEl.classList.add('lecture__youtube');
      this.container.appendChild(videoEl);
    }
  }

  finishLecture(slug, e) {
    const finished = e.target.classList.contains('buttons__finish--done');

    if (finished) {
      this.finishButton.innerHTML = 'Klára fyrirlestur';
      localStorage.removeItem(slug);
    } else {
      this.finishButton.innerHTML = '✓ Fyrirlestur kláraður';
      localStorage.setItem(slug, 'done');
    }

    this.finishButton.classList.toggle('buttons__finish--done');
  }

  /*
  * Nær í mynd og setur caption undir
  */
  imageItem(item) {
    const imgEl = makeImage(item.data);
    const imgCap = el('p');
    imgCap.classList.add('image__caption');
    imgCap.appendChild(document.createTextNode(item.caption));
    this.container.appendChild(imgEl);
    this.container.appendChild(imgCap);
  }

  /*
  * Býr til lista
  */
  listItem(item) {
    const listEl = el('ul');
    listEl.classList.add('list');

    for (let i = 0; i < item.data.length; i += 1) {
      const lItem = makeList(item.data[i]);
      lItem.classList.add('list__item');
      listEl.appendChild(lItem);
      this.container.appendChild(listEl);
    }
  }

  /*
  * Notað í index.js, nær í slug út frá URL
  */
  loadLecture() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    this.fetchLecture(slug).then(data => this.getLectures(data));

    this.finishButton.addEventListener('click', this.finishLecture.bind(this, slug));

    // ef þetta er commentað út, þá virkar græni liturinn fyrir hnappinn eðlilega
    // ---
    if ((localStorage.getItem(slug) === 'done')) {
      this.finishButton.classList.add('buttons__finish--done');
      this.finishButton.innerHTML = '✓ Fyrirlestur kláraður';
    }
  }
}

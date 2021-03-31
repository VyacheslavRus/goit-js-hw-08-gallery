import gallery from './default_images.js';

let refs = {

galleryList: document.querySelector('.js-gallery'),
galleryModal: document.querySelector('.js-lightbox'),
bigPicture: document.querySelector('.lightbox__image'),
closeBtn: document.querySelector('.lightbox__button'),
overlay: document.querySelector('.lightbox__overlay'),
};

gallery.forEach((el, index) =>{
const markup = `
  <li class="gallery__item">
    <a class="gallery__link" href="${el.original}">
      <img class="gallery__image" src="${el.preview}" data-source="${el.original}" alt="${el.description}" data-index="${index}"/>
    </a>
  </li>
  `
  refs.galleryList.insertAdjacentHTML('beforeend', markup)
});

const makeMarkupModal = (e) =>{
    e.preventDefault();
    if(e.target.nodeName !== 'IMG') {
        return
    }
    refs.bigPicture.src = e.target.dataset.source;
    refs.bigPicture.alt = e.target.alt;
    onOpenModal()
};

const onOpenModal = () =>{
  refs.galleryModal.classList.add('is-open')
  window.addEventListener('keydown', onEscClick);
  window.addEventListener('keydown', onArrowsClick);
};

const closeModal = (e) =>{
    refs.galleryModal.classList.remove('is-open')
    refs.bigPicture.src = '';
    refs.bigPicture.alt = '';
    window.removeEventListener('keydown', onEscClick);
    window.removeEventListener('keydown', onEscClick);
};

const onEscClick = (e) => {
  if(e.key === 'Escape') {
    closeModal() ;
  }  
}

const onOverlayClick = (e) => {
  if(e.target === refs.overlay){
    closeModal();
  }
}

const onArrowsClick = (e) => {
    let i = +e.target.firstElementChild.dataset.index;
  if(e.key ==='ArrowLeft' &&  i>0){
    i-=1
   slider(e, i);
  }
  else if (e.key ==='ArrowLeft' &&  i===0){
  i = gallery.length -1
  slider(e, i);
  }

  else if(e.key === 'ArrowRight' && i<gallery.length -1) {
    i+=1
    slider(e, i);
   }
  else if (e.key ==='ArrowRight' &&  i===gallery.length -1){
   i = 0
   slider(e, i);
  }
}

const slider = (e, index) =>{
  e.target.firstElementChild.dataset.index = index;
  refs.bigPicture.src = gallery[index].original;
}

refs.galleryList.addEventListener('click', makeMarkupModal);
refs.closeBtn.addEventListener('click', closeModal);
refs.galleryModal.addEventListener('click', onOverlayClick);




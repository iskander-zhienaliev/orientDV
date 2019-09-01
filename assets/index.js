import './style.scss'
import Photos from './js/photos'
import Main from "./js/main";
import './js/mobile';

const photosList = document.querySelector('.js-photos');
const news = document.querySelector('.js-news');
if (photosList) {
    const photos = new Photos();
    photos.init(photosList);
}
if (news) {
    const main = new Main(news);
    main.init();
}

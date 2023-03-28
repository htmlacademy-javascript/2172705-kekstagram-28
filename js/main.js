import { renderPictures } from './rendering-pictures.js';
import { getData } from './server-data.js';
import { showErrorAlert, debounce } from './utils.js';
import { initSortModule, getDefaultPostsView, getRandomPostsView, getDiscussedPostsView } from './sort-filters.js';

const POSTS_RERENDER_DELAY = 500;

getData()
  .then((dataset) => {
    renderPictures(dataset, false, false);
    getDefaultPostsView(debounce(() => renderPictures(dataset, false, false), POSTS_RERENDER_DELAY));
    getRandomPostsView(debounce(() => renderPictures(dataset, true, false), POSTS_RERENDER_DELAY));
    getDiscussedPostsView(debounce(() => renderPictures(dataset, false, true), POSTS_RERENDER_DELAY));
    initSortModule();
  })
  .catch(() => showErrorAlert('Не удалось загрузить данные! Попробуйте перезагрузить страницу.'));

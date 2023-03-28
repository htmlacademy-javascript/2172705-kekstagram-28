import { shuffleElements } from './utils.js';

const POSTS_COUNT = 10;

const sortingFiltersContainer = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

const removeButtonActiveClass = () => document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');

const getDefaultPostsView = (callback) => {
  defaultFilterButton.addEventListener('click', () => {
    removeButtonActiveClass();
    defaultFilterButton.classList.add('img-filters__button--active');
    callback();
  });
};

const getRandomPostsView = (callback) => {
  randomFilterButton.addEventListener('click', () => {
    removeButtonActiveClass();
    randomFilterButton.classList.add('img-filters__button--active');
    callback();
  });
};

const getDiscussedPostsView = (callback) => {
  discussedFilterButton.addEventListener('click', () => {
    removeButtonActiveClass();
    discussedFilterButton.classList.add('img-filters__button--active');
    callback();
  });
};

const compareCommentsCount = (first, second) => second.comments.length - first.comments.length;

const getRangeRandomPosts = (elements) => {
  const posts = elements.slice();
  shuffleElements(posts);

  return posts.slice(0, POSTS_COUNT);
};

const initSortModule = () => {
  sortingFiltersContainer.classList.remove('img-filters--inactive');
};

export { initSortModule, getRangeRandomPosts, getDefaultPostsView, getRandomPostsView, getDiscussedPostsView, compareCommentsCount };

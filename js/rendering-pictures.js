import {createPostsDataset} from './data.js';

const POSTS_COUNT = 25;

const templateDocumentFragment = document.querySelector('#picture').content;
const pictureTemplate = templateDocumentFragment.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const postsDataset = createPostsDataset(POSTS_COUNT);
const pictureFragmentContainer = document.createDocumentFragment();

postsDataset.forEach(({url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  pictureFragmentContainer.append(picture);
});

pictureList.append(pictureFragmentContainer);

import {createPostsDataset} from './data.js';

const POSTS_COUNT = 25;
const postsDataset = createPostsDataset(POSTS_COUNT);
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const createPicture = (item) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = item.url;
  picture.querySelector('.picture__comments').textContent = item.comments.length;
  picture.querySelector('.picture__likes').textContent = item.likes;

  return picture;
};

const renderPictures = () => {
  postsDataset.forEach((item) => picturesList.append(createPicture(item)));
};

export {renderPictures};

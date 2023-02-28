import {createPostsDataset} from './data.js';
import {openBigPictureModal} from './open-big-picture.js';

const POSTS_COUNT = 25;
const COMMENTS_STEP_COUNT = 5;

const postsDataset = createPostsDataset(POSTS_COUNT);
const pictureTemplateNode = document.querySelector('#picture').content.querySelector('.picture');
const picturesListNode = document.querySelector('.pictures');

const createPicture = (postData) => {
  const picture = pictureTemplateNode.cloneNode(true);
  picture.querySelector('.picture__img').src = postData.url;
  picture.querySelector('.picture__comments').textContent = postData.comments.length;
  picture.querySelector('.picture__likes').textContent = postData.likes;

  picture.addEventListener('click', (evt) => {
    openBigPictureModal(evt, postData, COMMENTS_STEP_COUNT);
  });

  return picture;
};

const renderPictures = () => {
  postsDataset.forEach((postData) => picturesListNode.append(createPicture(postData)));
};

export {renderPictures};

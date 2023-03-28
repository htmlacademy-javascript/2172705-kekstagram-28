import { openBigPicture } from './open-big-picture.js';
import { compareCommentsCount } from './sort-filters.js';
import { getRangeRandomPosts } from './sort-filters.js';
import { initUploadPictureModule } from './upload-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const clearPosts = () => document.querySelectorAll('.picture').forEach((post) => post.remove());

const createPicture = (data) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = data.url;
  picture.querySelector('.picture__comments').textContent = data.comments.length;
  picture.querySelector('.picture__likes').textContent = data.likes;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(data);
  });

  return picture;
};

const renderPictures = (dataset, isShuffled, isSorted) => {
  let datasetCopy = dataset.slice();
  if (isShuffled) {
    datasetCopy = getRangeRandomPosts(datasetCopy);
  }
  if (isSorted) {
    datasetCopy.sort(compareCommentsCount);
  }
  clearPosts();
  initUploadPictureModule();
  datasetCopy.forEach((data) => picturesList.append(createPicture(data)));
};

export { renderPictures };

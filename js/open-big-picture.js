import {renderComments, clearComments} from './show-comments.js';

const bigPictureContainerNode = document.querySelector('.big-picture');
const imageNode = bigPictureContainerNode.querySelector('.big-picture__img').querySelector('img');
const closeModalButtonNode = bigPictureContainerNode.querySelector('.big-picture__cancel');

const likesCountNode = bigPictureContainerNode.querySelector('.likes-count');
const commentsCountNode = bigPictureContainerNode.querySelector('.comments-count');
const socialCaptionNode = bigPictureContainerNode.querySelector('.social__caption');

// Для временного отключения
const commentsCountContainerNode = document.querySelector('.social__comment-count');
const commentsLoaderButtonNode = document.querySelector('.comments-loader');

const closeBigPictureModal = () => {
  clearComments();

  document.body.classList.remove('modal-open');
  bigPictureContainerNode.classList.add('hidden');

  document.removeEventListener('keydown', isEscapeKeydown);
  closeModalButtonNode.removeEventListener('click', closeBigPictureModal);
};

function isEscapeKeydown (evt) {
  if (evt.key === 'Escape') {
    closeBigPictureModal();
  }
}

const renderPost = (postData, commentsQuantity) => {
  imageNode.src = postData.url;
  likesCountNode.textContent = postData.likes;
  commentsCountNode.textContent = postData.comments.length;
  socialCaptionNode.textContent = postData.description;

  renderComments(postData, commentsQuantity);
};

const openBigPictureModal = (evt, postData, commentsQuantity) => {
  evt.preventDefault();
  renderPost(postData, commentsQuantity);

  bigPictureContainerNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', isEscapeKeydown);
  closeModalButtonNode.addEventListener('click', closeBigPictureModal);

  // Временное отключение
  commentsCountContainerNode.classList.add('hidden');
  commentsLoaderButtonNode.classList.add('hidden');
};

export {openBigPictureModal};

const pictureContainer = document.querySelector('.big-picture');
const pictureImage = document.querySelector('.big-picture__img img');
const pictureCaption = document.querySelector('.social__caption');
const pictureLikesCount = document.querySelector('.likes-count');
const pictureCloseButton = document.querySelector('.big-picture__cancel');

const commentsContainer = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const commentItem = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

const onCloseButtonClick = () => {
  closeBigPicture();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    closeBigPicture();
  }
};

const removeListeners = () => {
  pictureCloseButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const createListeners = () => {
  pictureCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const createComment = (commentData) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = commentData.avatar;
  newComment.querySelector('.social__picture').alt = commentData.name;
  newComment.querySelector('.social__text').textContent = commentData.message;

  return newComment;
};

const renderComments = (commentsDataset) => {
  commentsList.innerHTML = '';
  commentsDataset.forEach((item) => commentsList.append(createComment(item)));
};

const fillBigPicture = (data) => {
  pictureImage.src = data.url;
  pictureLikesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  pictureCaption.textContent = data.description;
};

function closeBigPicture () {
  pictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  removeListeners();
}

function openBigPicture (data) {
  pictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  fillBigPicture(data);
  renderComments(data.comments);
  createListeners();

  commentsContainer.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

export {openBigPicture};

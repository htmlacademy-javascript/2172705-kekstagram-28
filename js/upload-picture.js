import {validateUploadPictureForm} from './upload-picture-validation.js';

const pictureUploadForm = document.querySelector('.img-upload__form');

const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureEdit = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const pictureScaleInput = document.querySelector('.scale__control--value');

const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');
const noPictureFilterInput = document.querySelector('.effects__radio[value=none]');

const hashtagInput = document.querySelector('.img-upload__text .text__hashtags');
const commentInput = document.querySelector('.img-upload__text .text__description');

const onUploadPictureFormSubmit = (evt) => {
  if (!validateUploadPictureForm()) {
    evt.preventDefault();
  }
};

const onEffectInputClick = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    pictureUploadPreview.className = '';
    pictureUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
  }
};

const onCloseButtonClick = () => {
  closePictureUpload();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closePictureUpload();
  }
};

const createListeners = () => {
  pictureUploadForm.addEventListener('submit', onUploadPictureFormSubmit);
  effectsList.addEventListener('change', onEffectInputClick);

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeListeners = () => {
  effectsList.removeEventListener('change', onEffectInputClick);

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const defaultSetupPictureUpload = () => {
  pictureScaleInput.value = '100%';
  pictureUploadPreview.style.transform = '';
  noPictureFilterInput.checked = 'true';
  effectLevelInput.value = '';
  pictureUploadPreview.style.filter = '';
  pictureUploadPreview.className = 'effects__preview--none';
  hashtagInput.value = '';
  commentInput.value = '';
};

function openPictureUpload () {
  createListeners();
  defaultSetupPictureUpload();

  document.body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
}

function closePictureUpload () {
  removeListeners();
  defaultSetupPictureUpload();

  pictureUploadInput.value = '';
  document.body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
}

const initUploadPictureModule = () => {
  pictureUploadInput.addEventListener('change', openPictureUpload);
};

export {initUploadPictureModule};

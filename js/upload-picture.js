import {createFormListener, removeFormListener} from './upload-picture-form.js';
import {createSlider, setupSlider} from './upload-picture-slider.js';

const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureEdit = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');

const pictureScaleInput = document.querySelector('.scale__control--value');
const pictureScaleDownButton = document.querySelector('.scale__control--smaller');
const pictureScaleUpButton = document.querySelector('.scale__control--bigger');

const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const effectsList = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');
const noPictureFilterInput = document.querySelector('.effects__radio[value=none]');

const hashtagInput = document.querySelector('.img-upload__text .text__hashtags');
const commentInput = document.querySelector('.img-upload__text .text__description');

const onScaleDownButtonClick = () => {
  if (parseInt(pictureScaleInput.value, 10) > 25) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, 10) - 25}%`;
    pictureUploadPreview.style.transform = `scale(${parseInt(pictureScaleInput.value, 10) / 100})`;
  }
};

const onScaleUpButtonClick = () => {
  if (parseInt(pictureScaleInput.value, 10) < 100) {
    pictureScaleInput.value = `${parseInt(pictureScaleInput.value, 10) + 25}%`;
    pictureUploadPreview.style.transform = `scale(${parseInt(pictureScaleInput.value, 10) / 100})`;
  }
};

const onEffectInputClick = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    pictureUploadPreview.className = '';
    pictureUploadPreview.classList.add(`effects__preview--${evt.target.value}`);

    setupSlider(evt.target.value);
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
  pictureScaleDownButton.addEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.addEventListener('click', onScaleUpButtonClick);

  effectsList.addEventListener('change', onEffectInputClick);

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeListeners = () => {
  pictureScaleDownButton.removeEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.removeEventListener('click', onScaleUpButtonClick);

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

  effectLevelSliderContainer.classList.add('hidden');
};

function openPictureUpload () {
  createListeners();
  createFormListener();
  defaultSetupPictureUpload();
  createSlider();

  document.body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
}

function closePictureUpload () {
  removeListeners();
  removeFormListener();
  defaultSetupPictureUpload();
  effectLevelSlider.noUiSlider.destroy();

  pictureUploadInput.value = '';
  document.body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
}

const initUploadPictureModule = () => {
  pictureUploadInput.addEventListener('change', openPictureUpload);
};

export {closePictureUpload, initUploadPictureModule};

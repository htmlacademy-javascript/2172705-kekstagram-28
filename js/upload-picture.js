import { validateUploadPictureForm } from './upload-picture-validation.js';
import { createSlider, setupSlider, destroySlider } from './upload-picture-slider.js';
import { sendData } from './server-data.js';

const picturePreviewContainer = document.querySelector('.img-upload');
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadButton = document.querySelector('.img-upload__start');
const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadLabel = document.querySelector('.img-upload__label');
const pictureUploadPreview = document.querySelector('.img-upload__preview img');
const pictureEdit = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const closeButton = document.querySelector('.img-upload__cancel');

const effectsList = document.querySelector('.effects__list');
const checkedEffectInput = document.querySelector('.effects__radio[checked]');

const pictureScaleInput = document.querySelector('.scale__control--value');
const pictureScaleDownButton = document.querySelector('.scale__control--smaller');
const pictureScaleUpButton = document.querySelector('.scale__control--bigger');

const onUploadPictureFormSubmit = (evt) => {
  evt.preventDefault();

  if (validateUploadPictureForm()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        showMessage(createSuccessMessage, 'success');
        const temporaryStorageOfNode = pictureUploadInput;
        pictureUploadInput.remove(); // !Для исключения поля ввода из reset формы
        defaultSetupPictureUpload();
        setupSlider('none');
        pictureUploadButton.insertBefore(temporaryStorageOfNode, pictureUploadLabel);
      })
      .catch(() => {
        showMessage(createErrorMessage, 'error');
      })
      .finally(() => unblockSubmitButton());
  } else {
    showMessage(createErrorMessage, 'error');
  }
};

const onMessageModalKeydown = (evt) => {
  evt.stopPropagation();
  if (evt.key === 'Escape') {
    closeMessage();
  }
};

const onMessageModalClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    closeMessage();
  }
};

const onMessageButtonClick = () => {
  closeMessage();
};

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

const onCloseButtonClick = () => closePictureUpload();

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.closest('.text__hashtags') && !evt.target.closest('.text__description')) {
    closePictureUpload();
  }
};

const addListeners = () => {
  pictureUploadForm.addEventListener('submit', onUploadPictureFormSubmit);
  pictureScaleDownButton.addEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.addEventListener('click', onScaleUpButtonClick);
  effectsList.addEventListener('change', onEffectInputClick);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const removeListeners = () => {
  pictureUploadForm.removeEventListener('submit', onUploadPictureFormSubmit);
  pictureScaleDownButton.removeEventListener('click', onScaleDownButtonClick);
  pictureScaleUpButton.removeEventListener('click', onScaleUpButtonClick);
  effectsList.removeEventListener('change', onEffectInputClick);
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const addMessageListeners = (type) => {
  document.querySelector(`.${type}__button`).addEventListener('click', onMessageButtonClick);
  document.querySelector(`.${type}`).addEventListener('click', onMessageModalClick);
  document.querySelector(`.${type}`).addEventListener('keydown', onMessageModalKeydown);
};

function createSuccessMessage() {
  return document.querySelector('#success').content.querySelector('.success').cloneNode(true);
}

function createErrorMessage() {
  return document.querySelector('#error').content.querySelector('.error').cloneNode(true);
}

function showMessage(messageBuilder, messageType) {
  picturePreviewContainer.append(messageBuilder());
  document.querySelector(`.${messageType}__button`).focus();
  addMessageListeners(messageType);
}

function closeMessage() {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
}

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function defaultSetupPictureUpload() {
  pictureUploadForm.reset();
  pictureUploadPreview.style = null;
  pictureUploadPreview.className = 'effects__preview--none';
  pictureScaleInput.defaultValue = '100%';
}

function openPictureUpload() {
  addListeners();
  createSlider();
  setupSlider(checkedEffectInput.value);

  document.body.classList.add('modal-open');
  pictureEdit.classList.remove('hidden');
}

function closePictureUpload() {
  removeListeners();
  destroySlider();
  defaultSetupPictureUpload();

  document.body.classList.remove('modal-open');
  pictureEdit.classList.add('hidden');
}

const initUploadPictureModule = () => {
  pictureUploadInput.addEventListener('change', openPictureUpload);
  defaultSetupPictureUpload();
};

export { initUploadPictureModule };

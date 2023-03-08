import {closePictureUpload} from './upload-picture.js';
import {checkStringLength, findDuplicates} from './utils.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAG_REG_EXP = /#[\dа-яa-z]{1,19}\s/gi;

const pictureUploadForm = document.querySelector('.img-upload__form');

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const commentInput = document.querySelector('.img-upload__text .text__description');
const hashtagInput = document.querySelector('.img-upload__text .text__hashtags');

const checkHashtags = () => {
  const hashtagString = hashtagInput.value.trim();

  if (hashtagInput.value === '') {
    return true;
  }

  if (`${hashtagString} `.replace(HASHTAG_REG_EXP, '') || hashtagString.split(' ').length > 5 || findDuplicates(hashtagString.toLowerCase().split(' ')).length !== 0) {
    return false;
  }

  return true;
};

const checkComment = () => checkStringLength(commentInput.value, COMMENT_MAX_LENGTH);

const pristineSetup = new Pristine(pictureUploadForm);
pristineSetup.addValidator(hashtagInput, checkHashtags);
pristineSetup.addValidator(commentInput, checkComment);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristineSetup.validate()) {
    openMessage(createMessage, true);
    createMessageListener(true);
  } else {
    openMessage(createMessage, false);
    createMessageListener(false);
  }
};

const onMessageCloseButtonClick = () => {
  closeMessage();
};

const onModalClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeMessage();
  }
};

// Не срабатывает :с
const onModalKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    closeMessage();
  }
};

const createFormListener = () => {
  pictureUploadForm.addEventListener('submit', onFormSubmit);
};

const removeFormListener = () => {
  pictureUploadForm.removeEventListener('submit', onFormSubmit);
};

function createMessageListener (isSuccess) {
  if (isSuccess) {
    document.querySelector('#success-message').addEventListener('keydown', onModalKeydown);
    document.querySelector('#success-message').querySelector('.success__button').addEventListener('click', onMessageCloseButtonClick);
  } else {
    document.querySelector('#error-message').addEventListener('keydown', onModalKeydown);
    document.querySelector('#error-message').querySelector('.error__button').addEventListener('click', onMessageCloseButtonClick);
  }
  document.addEventListener('click', onModalClick);
}

const removeMessageListeners = () => {
  if (document.querySelector('#success-message')) {
    document.querySelector('#success-message').querySelector('.success__button').removeEventListener('click', onMessageCloseButtonClick);
  }
  if (document.querySelector('#error-message')) {
    document.querySelector('#error-message').querySelector('.error__button').removeEventListener('click', onMessageCloseButtonClick);
  }
  document.removeEventListener('click', onModalClick);
};

function createMessage (isSuccess) {
  if (isSuccess) {
    const successMessage = successMessageTemplate.cloneNode(true);
    successMessage.id = 'success-message';
    return successMessage;
  }

  const errorMessage = errorMessageTemplate.cloneNode(true);
  errorMessage.id = 'error-message';
  return errorMessage;
}

function closeMessage () {
  removeMessageListeners();

  if (document.querySelector('#success-message')) {
    document.querySelector('#success-message').remove();
    closePictureUpload();
  }

  if (document.querySelector('#error-message')) {
    document.querySelector('#error-message').remove();
  }
}

function openMessage (callback, isSuccess) {
  document.body.append(callback(isSuccess));
}

export {createFormListener, removeFormListener};

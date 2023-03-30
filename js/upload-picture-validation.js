const HASHTAG_REG_EXP = /^#[\dа-яa-z]{1,19}\s/gi;
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_DUPLICATES_COUNT = 0;

const pictureUploadForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.img-upload__text .text__hashtags');

const pristineSetup = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

const checkHashtags = () => {
  const hashtagString = hashtagInput.value.trim();

  if (!hashtagInput.value) {
    return true;
  }

  if (`${hashtagString} `.replace(HASHTAG_REG_EXP, '') ||
    hashtagString.split(' ').length > MAX_HASHTAGS_COUNT ||
    findDuplicates(hashtagString.toLowerCase().split(' ')).length !== MAX_HASHTAG_DUPLICATES_COUNT) {

    return false;
  }

  return true;
};

pristineSetup.addValidator(hashtagInput, checkHashtags, 'Поле заполнено неверно');

const validateUploadPictureForm = () => pristineSetup.validate();

export { validateUploadPictureForm };

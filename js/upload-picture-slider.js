const effectSetups = {
  CHROME: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  SEPIA: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  MARVIN: {
    range: {
      min: 0,
      max: 100
    },
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  PHOBOS: {
    range: {
      min: 0,
      max: 3
    },
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  HEAT: {
    range: {
      min: 1,
      max: 3
    },
    step: 0.1,
    filter: 'brightness',
    unit: ''
  }
};

const pictureUploadPreview = document.querySelector('.img-upload__preview img');

const effectLevelSliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');

function updateSlider (effect, start = 100) {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    step: effect.step,
    start: start,
  });
}

const createSlider = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
  });
};

function setupSlider (effect) {
  if (effect === 'none') {
    pictureUploadPreview.style.filter = '';
    effectLevelSlider.noUiSlider.off();
    effectLevelSliderContainer.classList.add('hidden');
  } else {
    const filterChoice = effect.toUpperCase();
    updateSlider(effectSetups[filterChoice]);

    effectLevelSlider.noUiSlider.off();
    effectLevelSlider.noUiSlider.on('update', () => {
      effectLevelInput.value = effectLevelSlider.noUiSlider.get();
      pictureUploadPreview.style.filter = `${effectSetups[filterChoice].filter}(${effectLevelInput.value + effectSetups[filterChoice].unit})`;
    });

    effectLevelSliderContainer.classList.remove('hidden');
  }
}

export {createSlider, setupSlider};

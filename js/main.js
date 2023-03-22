import { renderPictures } from './rendering-pictures.js';
import { initUploadPictureModule } from './upload-picture.js';
import { getData } from './server-data.js';
import { showErrorAlert } from './utils.js';

getData()
  .then((dataset) => renderPictures(dataset))
  .catch(() => showErrorAlert('Не удалось загрузить данные! Попробуйте перезагрузить страницу.'));

initUploadPictureModule();

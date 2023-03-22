const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const findDuplicates = (elements) => elements.filter((item, index) => elements.indexOf(item) !== index);

const showErrorAlert = (text) => {
  const message = document.createElement('div');
  message.style.zIndex = '100';
  message.style.position = 'absolute';
  message.style.left = '0';
  message.style.top = '0';
  message.style.right = '0';
  message.style.padding = '10px';
  message.style.fontSize = '20px';
  message.style.textAlign = 'center';
  message.style.backgroundColor = 'red';
  message.textContent = text;

  document.body.append(message);

  setTimeout(() => message.remove(), ALERT_SHOW_TIME);
};

export { getRandomInteger, findDuplicates, showErrorAlert };

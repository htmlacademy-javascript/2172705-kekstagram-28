const checkLengthString = (string, length) => String(string).length <= length;

const checkPalindrome = (string) => {
  string = String(string).toLowerCase().replaceAll(' ', '');
  return string === string.split('').reverse().join('');
};

const getInteger = (string) => {
  string = String(string).replace(/\D/g, '');
  return parseInt(string, 10);
};

const addSymbols = (string, length, extension) => {
  string = String(string);
  if (string.length >= length) {
    return string;
  }

  while (string.length < length) {
    const extensionLength = length - string.length;
    string = extension.slice(0, extensionLength) + string;
  }

  return string;
};


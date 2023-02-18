function checkLengthString (string, length) {
  return string.length <= length;
}

function checkPalindrome (string) {
  let uniformString = string.toLowerCase();

  if (uniformString.indexOf(' ') !== -1) {
    uniformString = uniformString.replaceAll(' ', '');
  }

  for (let i = 0; i < Math.round(uniformString.length / 2); i++) {
    if (uniformString[i] !== uniformString[uniformString.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

function getInteger (string) {
  const uniformString = String(string);
  let integerNumber = '';

  for (const symbol of uniformString) {
    if (parseInt(symbol, 10) || symbol === '0') {
      integerNumber += symbol;
    }
  }

  return integerNumber ? parseInt(integerNumber, 10) : NaN;
}

function addSymbols (originalString, minStringLength, additionalSymbols) {
  if (originalString.length >= minStringLength) {
    return originalString;
  }

  let finalString = originalString;
  while (finalString.length !== minStringLength) {
    if ((finalString.length + additionalSymbols.length) > minStringLength) {
      const endSliceValue = minStringLength - finalString.length;
      const shortedAdditionalSymbols = additionalSymbols.slice(0, endSliceValue);
      return shortedAdditionalSymbols + finalString;
    }
    finalString = additionalSymbols + finalString;
  }

  return finalString;
}

const getData = (address, onSuccess, onFail) => {
  fetch(address)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};

const sendData = (address, onSuccess, onFail, body) => {
  fetch(address, {
    method: 'POST',
    body
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};

export { getData, sendData };

const URL = 'https://28.javascript.pages.academy';

const URNs = {
  GET_DATA: '/kekstagram/data',
  SEND_DATA: '/kekstagram'
};

const processResponse = (url, method, body = null) => fetch(url, { method: method, body: body }).then((response) => response.json());

const getData = () => processResponse(`${URL + URNs.GET_DATA}`, 'GET');

const sendData = (body) => processResponse(`${URL + URNs.SEND_DATA}`, 'POST', body);

export { getData, sendData };

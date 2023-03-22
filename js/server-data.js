const URI = 'https://28.javascript.pages.academy';

const URNs = {
  GET_DATA: '/kekstagram/data',
  SEND_DATA: '/kekstagram'
};

const processResponse = (url, method, body = null) => fetch(url, { method: method, body: body }).then((response) => response.json());

const getData = () => processResponse(`${URI + URNs.GET_DATA}`, 'GET');

const sendData = (body) => processResponse(`${URI + URNs.SEND_DATA}`, 'POST', body);

export { getData, sendData };

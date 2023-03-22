const processResponse = (url, method, body = null) => fetch(url, { method: method, body: body }).then((response) => response.json());

const getData = () => processResponse('https://28.javascript.pages.academy/kekstagram/data', 'GET');

const sendData = (body) => processResponse('https://28.javascript.pages.academy/kekstagram', 'POST', body);

export { getData, sendData };

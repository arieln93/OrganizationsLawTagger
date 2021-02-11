export const xhrHeaderTypes = {
  applicationJson: 'application/json;charset=UTF-8',
  urlEncoded: 'application/x-www-form-urlencoded',
};
export const xhrPost = async (url, contentType, body, callback) => {
  const xhr = new XMLHttpRequest();
  await xhr.open('POST', url, true);
  await xhr.setRequestHeader('Content-type', contentType);
  xhr.onload = (event) => {
    callback(event.target.response);
  };
  await xhr.send(body || '{}');
};
export const xhrGet = async (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = async (event) => {
    if (event.target.readyState === 4 && event.target.status === 200) {
      callback(event.target.response);
    }
  };
  await xhr.send();
};

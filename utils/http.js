const request = require('request');

const contentTypes = {
  applicationJson: 'application/json',
  urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
};

function getRequest(url, headers, alwaysExpectAnObject) {
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'GET',
        url,
        headers,
      },
      (error, response) => {
        if (error) {
          console.log(`GET REQUEST ERROR: ${url}\n${error}`);
          reject(error);
          return;
        }
        console.log(`GET REQUEST SUCCESS: ${url}`);
        if (alwaysExpectAnObject && typeof response.body === 'string') {
          resolve(JSON.parse(response.body));
        }
        resolve(response.body);
      },
    );
  });
}

function postRequest(url, headers, reqBody, alwaysExpectAnObject) {
  const options = {
    method: 'POST',
    url,
    headers,
  };
  if (headers['Content-type'] === contentTypes.applicationJson) options.json = reqBody;
  else options.form = reqBody;
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        console.log(`POST REQUEST ERROR: ${url}\n${error}`);
        reject(error);
        return;
      }
      console.log(`POST REQUEST SUCCESS: ${url}`);
      if (alwaysExpectAnObject && typeof response.body === 'string') {
        resolve(JSON.parse(response.body));
      }
      resolve(response.body);
    });
  });
}

function putRequest(url, headers, reqBody, alwaysExpectAnObject) {
  return new Promise((resolve, reject) => {
    request(
      {
        method: 'PUT',
        url,
        json: reqBody,
        headers,
      },
      (error, response) => {
        if (error) {
          console.log(`PUT REQUEST ERROR:\n${url}\n${error}`);
          reject(error);
        }
        console.log(`PUT REQUEST SUCCESS:\n${url}\nrequest: ${JSON.stringify(reqBody, null, 2)}`);
        if (alwaysExpectAnObject && typeof response.body === 'string') {
          resolve(JSON.parse(response.body));
        }
        resolve(response.body);
      },
    );
  });
}

module.exports = {
  contentTypes,
  getRequest,
  postRequest,
  putRequest,
};

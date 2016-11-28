function getJson(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('get', url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        let status = xhr.status;
        let data = xhr.responseText;

        if (status === 200) {
          resolve(JSON.parse(data));
        } else {
          reject({ status: status, body: data });
        }
      }
    };

    xhr.send();
  });
}

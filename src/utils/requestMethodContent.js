import axios from "axios";

function getMethodContent(path) {
  return new Promise((resolve, reject) => {
    axios
      .get(path)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { getMethodContent };

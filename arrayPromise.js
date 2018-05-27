function arrayPromise(data, eachCallback) {
    return new Promise((resolve, reject) => {
        data.forEach(eachCallback);
        resolve();
    });
  }

module.exports = arrayPromise;
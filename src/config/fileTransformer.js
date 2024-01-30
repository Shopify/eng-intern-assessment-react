module.exports = {
  process(fileContent) {
    return {
      // transforms content of the file into a JSON string which allows it to be embedded in javascript file (necessary because otherwise .css file causes issues with jest)
      code: `module.exports = ${JSON.stringify(fileContent)};`,
    };
  },
};

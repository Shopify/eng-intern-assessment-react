// to allow for tests going smoothly ignoring CSS
module.exports = {
    process(src, filename, config, options) {
      return {
        code: 'module.exports = {};',
      };
    },
  };
  
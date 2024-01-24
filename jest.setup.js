// jest.setup.js
import '@testing-library/jest-dom/extend-expect';

const { JSDOM } = require('jsdom');

const jsdomConfig = {
  url: 'http://localhost',
};

const dom = new JSDOM('<!doctype html><html><body></body></html>', jsdomConfig);

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

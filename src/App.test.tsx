import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

describe('App tests', () => {
    it('render should match snapshot file', () => {
        const tree = renderer.create(<App/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
import React from 'react';
import renderer from 'react-test-renderer';
import Laps from './Laps';

describe('Laps tests', () => {
    it('render should match snapshot file with empty recordedLapTimes array', () => {
        const tree = renderer.create(<Laps recordedLapTimes={[]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('render should match snapshot file with non-empty recordedLapTimes array', () =>{
        const tree = renderer.create(<Laps recordedLapTimes={[1000,10000,20000,25000,30000]}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
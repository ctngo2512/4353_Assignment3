import React from 'react';
import {shallow, mount} from 'enzyme';
import Hero from './Hero';

describe('Profile component tests', ()=> {
    const wrapper = shallow(<Hero />);

    it("renders without crashing", () => {
        shallow(<Hero />);
    });

    it ("contains Welcome message", () => {
        expect(wrapper.find('h2').contains('Welcome,')).toBe(true);
    });

    

});
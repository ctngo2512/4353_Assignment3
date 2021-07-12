import React from 'react';
import {shallow, mount} from 'enzyme';
import Hero from './Hero';

describe('Login component tests', ()=> {
    const wrapper = shallow(<Hero />);

    it("renders without crashing", () => {
        shallow(<Hero />);
    });

    it ("contains message", () => {
        expect(wrapper.find('h2').contains('Welcome,')).toBe(true);
    });


});
import React from 'react';
import {shallow, mount} from 'enzyme';
import Hero from './Hero';
import {handleLogout} from './Hero';
import {goBack} from './Hero';

describe('Profile component tests', ()=> {
    const wrapper = shallow(<Hero />);

    it("renders without crashing", () => {
        shallow(<Hero />);
    });

    it ("contains Welcome message", () => {
        expect(wrapper.find('h2').contains('Welcome,')).toBe(true);
    });

    test('should handle logout and go back', () => {
        
        const wrapper = shallow(<Hero onClick={handleLogout} />);
        wrapper.find('Button').at(1).simulate('submit');
        
        const wrapper2 = shallow(<Hero onClick={goBack} />);
        wrapper2.find('Button').at(1).simulate('submit');

    })

});
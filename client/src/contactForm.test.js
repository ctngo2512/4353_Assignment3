import React from 'react';
import {shallow, mount} from 'enzyme';
import ContactForm from './contactForm';

describe('Login component tests', ()=> {
    const wrapper = shallow(<ContactForm />);

    it("renders without crashing", () => {
        shallow(<ContactForm />);
    });
});
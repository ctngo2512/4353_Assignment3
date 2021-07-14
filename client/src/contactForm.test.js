import React from 'react';
import {shallow, mount} from 'enzyme';
import ContactForm from './contactForm';
import {handleFormSubmit} from './contactForm';

describe('Contact Form component tests', ()=> {

    it("renders without crashing", () => {
        shallow(<ContactForm />);
    });

    it ('calls onSubmit prop function when form is submitted', () => {
        const wrapper = mount(<ContactForm onSubmit={handleFormSubmit}/>);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    })
});
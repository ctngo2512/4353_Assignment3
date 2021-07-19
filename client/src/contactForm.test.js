import React from 'react';
import {shallow, mount} from 'enzyme';
import ContactForm from './contactForm';
import {handleFormSubmit} from './contactForm';
import {handleValidation} from './contactForm';
import { act, render } from '@testing-library/react';
import fire from './fire';
import Hero from './Hero';

window.alert = jest.fn();

describe('Contact Form component tests', ()=> {
    window.alert.mockClear();

    it("renders without crashing", () => {
        shallow(<ContactForm />);
    });

    it('Renders user data', () => {
        let fakeUser = {
            name: '',
            address: '',
            city: '',
            state: '',
            zipcode: ''
        }

        let snapshot = {val: () => fakeUser};
        jest.spyOn(fire, 'database').mockImplementation(() => ({
            ref: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => callback(snapshot))
        }));
    
        act(() => {
            render(<Hero/>);
        });
    
        const wrapper = shallow(<ContactForm/>);
        
    
    });

    it ('calls onSubmit prop function when form is submitted', () => {
        const wrapper = shallow(<ContactForm onSubmit={handleFormSubmit}/>);
        const form = wrapper.find('form');
        form.simulate('submit');
    })


});
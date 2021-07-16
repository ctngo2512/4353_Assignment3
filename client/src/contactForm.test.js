import React from 'react';
import {shallow, mount} from 'enzyme';
import ContactForm from './contactForm';
import {handleFormSubmit} from './contactForm';
import { act, render } from '@testing-library/react';
import fire from './fire';
import Hero from './Hero';

describe('Contact Form component tests', ()=> {
    const wrapper = shallow(<ContactForm />);

    it("renders without crashing", () => {
        shallow(<ContactForm />);
    });

    it('Renders user data', () => {
        let fakeUser = {
            name: 'Meep',
            address: '1234 street',
            city: 'houston',
            state: 'TX',
            zipcode: '12345'
        }
    
        let snapshot = {val: () => fakeUser};
        jest.spyOn(fire, 'database').mockImplementation(() => ({
            ref: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => callback(snapshot))
        }));
    
        act(() => {
            render(<Hero/>);
        });
    
        expect(wrapper.find('.Name').textContent).toBe(fakeUser.name);
        expect(wrapper.find('.address').textContent).toBe(fakeUser.address);
        expect(wrapper.find('.city').textContent).toBe(fakeUser.city);
        expect(wrapper.find('.state').textContent).toBe(fakeUser.state);
        expect(wrapper.find('.zipcode').textContent).toBe(fakeUser.zipcode);
    
    });

    it ('calls onSubmit prop function when form is submitted', () => {
        const wrapper = mount(<ContactForm onSubmit={handleFormSubmit}/>);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    })
});
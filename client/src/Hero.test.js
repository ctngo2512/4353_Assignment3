import React, {useEffect} from 'react';
import fire from "./fire";
import {shallow, mount} from 'enzyme';
import Hero from './Hero';
import {handleLogout} from './Hero';
import {goBack} from './Hero';
import { act, render } from '@testing-library/react';
import ContactForm from './contactForm';

describe('Profile component tests', ()=> {
    
    const wrapper = shallow(<Hero />);
    
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
            render(<ContactForm/>);
        });
    
        expect(container.querySelector('.Name').textContent).toBe(fakeUser.name);
        expect(container.querySelector('.Address').textContent).toBe(fakeUser.address);
        expect(container.querySelector('.City').textContent).toBe(fakeUser.city);
        expect(container.querySelector('.State').textContent).toBe(fakeUser.state);
        expect(container.querySelector('.Zipcode').textContent).toBe(fakeUser.zipcode);
    
    });

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
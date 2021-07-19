import React from 'react';
import {shallow, mount} from 'enzyme';
import FuelForm from './fuel';
import {handleFormSubmit} from './fuel';
import fire from './fire';
import { act, render } from '@testing-library/react';

window.alert = jest.fn();

describe('Fuel page component tests', ()=> {
    window.alert.mockClear();

    it("renders without crashing", () => {
        shallow(<FuelForm />);
    });

    it ('calls onSubmit prop function when form is submitted', () => {
        const wrapper = shallow(<FuelForm onSubmit={handleFormSubmit}/>);
        const form = wrapper.find('form');
        form.simulate('submit');
    })

    it('Renders user data', () => {
        let fakeUser = {
            gallon_requested: '',
            delivery_address: '',
            delivery_date: '',
            suggested_price: '',
            total_due: ''
        }

        let snapshot = {val: () => fakeUser};
        jest.spyOn(fire, 'database').mockImplementation(() => ({
            ref: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => callback(snapshot))
        }));
    
        act(() => {
            render(<FuelForm/>);
        });
    
        const wrapper = shallow(<ContactForm/>);
        
    
    });
});

import React from 'react';
import {shallow, mount} from 'enzyme';
import FuelForm from './fuel';
import {handleFormSubmit} from './fuel';

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
});

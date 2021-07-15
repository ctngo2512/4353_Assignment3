import React from 'react';
import {shallow, mount} from 'enzyme';
import FuelForm from './fuel';
import {handleFormSubmit} from './fuel';

describe('Fuel page component tests', ()=> {

    it("renders without crashing", () => {
        shallow(<FuelForm />);
    });

    it ('calls onSubmit prop function when form is submitted', () => {
        const wrapper = mount(<FuelForm onSubmit={handleFormSubmit}/>);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(handleFormSubmit).toHaveBeenCalledTimes(1);
    })
});

import React from 'react';
import {shallow, mount} from 'enzyme';
import FuelForm from './fuel';

describe('Login component tests', ()=> {
    const wrapper = shallow(<FuelForm />);

    it("renders without crashing", () => {
        shallow(<FuelForm />);
    });
});
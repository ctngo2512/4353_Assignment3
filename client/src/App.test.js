import React from 'react';
import {shallow, mount} from 'enzyme';
import App from './App';

describe('App component tests', ()=> {
    const wrapper = shallow(<App />);

    it("renders without crashing", () => {
        shallow(<App />);
    });
});
import React from 'react';
import {shallow, mount} from 'enzyme';
import App from './App';
import { act, render } from '@testing-library/react';
import Hero from './Hero';
import {handleLogout} from './Hero';

describe('App component tests', ()=> {
    
    it("renders without crashing", () => {
        shallow(<App />);
    });

    test('should handle login and hero', () => {

        const wrapper = shallow(<App />);
        
        const wrapper2 = mount(<Hero handleLogout = {handleLogout}/>);

    })

});
import React from 'react';
import {shallow, mount} from 'enzyme';
import Login from './Login';
import hasAccount from './Login';

    describe('Login component tests', ()=> {
        const wrapper = shallow(<Login />);

        it('should have a btn component', ()=> {

            //There should be only one button
            expect(wrapper.find('Button')).toHaveLength(1);

            //Button should have matching text
            expect(wrapper.find('Button').text()).toEqual('Sign Up');
           
            //Testing if the Sign In Button appears when a user has an account
            const wrapper2 = shallow(<Login hasAccount = {hasAccount}/>);

            expect(wrapper2.find('Button').text()).toEqual('Sign In');
            
           
        });
            

        it('should have input for email and password', ()=> {
            //Email and password input field should be present
            expect(wrapper.find('.email')).toHaveLength(1);
            expect(wrapper.find('.password')).toHaveLength(1);
        });

        it('should have an empty email and password state var', ()=> {
            //Optionally test to check if password and email are empty strings on 
              // setup
            expect(wrapper.find(Login).dive().state('email')).toEqual('');
            expect(wrapper.find(Login).dive().state('password')).toEqual('');
        });

    });
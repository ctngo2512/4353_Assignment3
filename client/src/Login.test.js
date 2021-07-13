import React from 'react';
import {shallow, mount} from 'enzyme';
import Login from './Login';
import hasAccount from './Login';
import functions from "firebase-functions-test";
import * as admin from "firebase-admin";
import * as path from "path";

const projectConfig = {
    projectId: "login-e839c",
    databaseURL: "https://login-e839c-default-rtdb.firebaseio.com/"
};

describe('Login component tests', ()=> {
  let adminStub, api;
  const wrapper = shallow(<Login />);

  it("renders without crashing", () => {
      shallow(<Login />);
  });

  it('should have a btn component', ()=> {

      //There should be only one button
      expect(wrapper.find('Button')).toHaveLength(1);

      //Button should be undefined after being clicked
      expect(wrapper.find('Button')
      .type().defaultProps.type)
      .toEqual(undefined);

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

  it('should an avatar', ()=> {
      //login logo should be displayed
      expect(wrapper.find('.image')).toHaveLength(1);
  });

  it('should have an empty email and password state var', ()=> {
      //Optionally test to check if password and email are empty strings on 
        // setup
      expect(wrapper.find('.email').text()).toEqual('');
      expect(wrapper.find('.password').text()).toEqual('');
      //console.log("TEST THIS" + wrapper.find('.email').text() + "TEST");
      
  });

  beforeAll(() => {
      // you can use `sinon.stub` instead
      adminStub = jest.spyOn(admin, "initializeApp");
  
      // after initializeApp call, we load our functions
      api = require("../index");
  });

  afterAll(() => {
    // clean things up
    adminStub.mockRestore();
    testEnv.cleanup();

    // reset our database
    admin
      .database()
      .ref("users")
      .remove();
  });

  it("should store user in db on GoogleOAuth", async () => {
    const wrapped = testEnv.wrap(api.onUserCreate);

  const testUser = {
      uid: "122",
      displayName: "lee"
    };
  
  // wrap your `onUserCreate` method and pass parameter: user
  // for the sake of brevity, I omitted other `UserRecord` properties.
  // you can check https://firebase.google.com/docs/reference/js/firebase.User for more information
  await wrapped(testUser);

  // we read our user from database
  const createdUser = await admin
    .database()
    .ref(`/users/${testUser.uid}`)
    .once("value");

  // we expect our newly created user to have zero points
  expect(createdUser.val()).toHaveProperty("points", 0);
  });
    
});
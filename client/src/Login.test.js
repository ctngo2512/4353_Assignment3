import React from 'react';
import {shallow, mount} from 'enzyme';
import Login from './Login';
import hasAccount from './Login';
import functions from "firebase-functions-test";
import * as admin from "firebase-admin";
import * as path from "path";

const test = require('firebase-functions-test')({
    projectId: "login-e839c",
    databaseURL: "https://login-e839c-default-rtdb.firebaseio.com/",
    storageBucket: "login-e839c.appspot.com",
}, '/Users/cheesecake3/Documents/GitHub/4353_Assignment3/client/src/login-e839c-firebase-adminsdk-27r7e-da8e602795.json');

// Mock functions config values
test.mockConfig({ stripe: { key: '23wr42ewr34' }});

// after firebase-functions-test has been initialized
const myFunctions = require('./Login'); // relative path to functions code
const wrapped = test.wrap(myFunctions.handleLogin);

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

const data = exampleDataSnapshotChange();// See next section for constructing test data

// Invoke the wrapped function without specifying the event context.
wrapped(data);

// Invoke the function, and specify params
wrapped(data, {
  params: {
    pushId: '234234'
  }
});

// Invoke the function, and specify auth and auth Type (for real time database functions only)
wrapped(data, {
  auth: {
    uid: 'jckS2Q0'
  },
  authType: 'USER'
});

// Invoke the function, and specify all the fields that can be specified
wrapped(data, {
  eventId: 'abc',
  timestamp: '2018-03-23T17:27:17.099Z',
  params: {
    pushId: '234234'
  },
  auth: {
    uid: 'jckS2Q0' // only for real time database functions
  },
  authType: 'USER' // only for real time database functions
});

  /*beforeAll(() => {
      // you can use `sinon.stub` instead
      adminStub = jest.spyOn(admin, "initializeApp");
  
      // after initializeApp call, we load our functions
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
  }); */
    
});
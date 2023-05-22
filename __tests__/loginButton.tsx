import React from "react";
import renderer from "react-test-renderer";
import LoginButton from "../components/login/loginButton";
test('login button renders correctly', () => {
  // jest.mock('@react-native-google-signin/google-signin', () => {});
  const tree  = renderer.create(<LoginButton filled = {true} text = {'Testing'}/>).toJSON();
  expect(tree).toMatchSnapshot();
})
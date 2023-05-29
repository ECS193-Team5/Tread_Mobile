import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import SignupPage from "../testPages/signupPage";
import {toHaveStyle} from "@testing-library/jest-native";
import LoginPage from "../testPages/loginPage";
import {fireEvent, render, screen} from "@testing-library/react-native";

expect.extend({ toHaveStyle });

it('Correct Render', () => {
    let tree = null;

    const handleOnPress = jest.fn()
    const handleSwitchAccount = jest.fn()

    act(() => {
        tree = renderer.create(
            <SignupPage
                handleOnPress={handleOnPress}
                handleSwitchAccount={handleSwitchAccount}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});

it('Submit Sign up', () => {
    const handleOnPress = jest.fn()
    const handleSwitchAccount = jest.fn()

    render(
        <SignupPage
            handleOnPress={handleOnPress}
            handleSwitchAccount={handleSwitchAccount}
        />
    );

    const element = screen.getByTestId('output')
    fireEvent(element, 'onPress');
    expect(handleOnPress).toBeCalled()
});

it('Switch Accounts', () => {
    const handleOnPress = jest.fn()
    const handleSwitchAccount = jest.fn()

    render(
        <SignupPage
            handleOnPress={handleOnPress}
            handleSwitchAccount={handleSwitchAccount}
        />
    );

    const element = screen.getByTestId('switch')
    fireEvent(element, 'onPress');
    expect(handleSwitchAccount).toBeCalled()
});
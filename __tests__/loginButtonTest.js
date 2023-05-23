import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import LoginButton from "../components/test/loginButton";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
expect.extend({ toHaveStyle });
it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <LoginButton
                // value={"Yes"}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});

it('Test login button', () => {
    render(
        <LoginButton
            filled={true}
        />
    );

    const element = screen.getByTestId('button')

    expect(element).toHaveStyle({
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        width: '100%',
        height: '12.5%',
        justifyContent: 'center',
        alignItems: 'center'
    })
});

it('Test signup button', () => {
    render(
        <LoginButton
            filled={false}
        />
    );

    const element = screen.getByTestId('button')

    expect(element).toHaveStyle({
        backgroundColor: 'transparent',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        width: '100%',
        height: '31.25%',
        justifyContent: 'center',
        alignItems: 'center'
    })
});
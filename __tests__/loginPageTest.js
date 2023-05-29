import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import LoginPage from "../testPages/loginPage";

import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
import LoginButton from "../testComps/login/loginButton";

expect.extend({ toHaveStyle });

it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <LoginPage

            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});
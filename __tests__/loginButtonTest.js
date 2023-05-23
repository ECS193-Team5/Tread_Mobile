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

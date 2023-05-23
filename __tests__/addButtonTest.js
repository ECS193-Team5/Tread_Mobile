import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
import AddButton from "../components/test/addButton";
import LoginButton from "../components/test/loginButton";
expect.extend({ toHaveStyle });

it('Correct Render', () => {
    let tree = null;
    const onPress = jest.fn()

    act(() => {
        tree = renderer.create(
            <AddButton
                onPress={onPress}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});
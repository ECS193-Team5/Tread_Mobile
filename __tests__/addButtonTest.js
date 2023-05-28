import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
import AddButton from "../testComps/add/addButton";
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

it('Test onPress', () => {
    const onPress = jest.fn()

    render(
        <AddButton
            onPress={onPress}
        />
    );

    const element = screen.getByTestId('button')
    fireEvent(element, 'onPress');
    expect(onPress).toBeCalled()
});
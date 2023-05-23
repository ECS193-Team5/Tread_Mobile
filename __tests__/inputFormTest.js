/**
 * @format
 */
import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import InputForm from "../components/test/InputForm";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
expect.extend({ toHaveStyle });
it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <InputForm
                // value={"Yes"}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});

it('Placeholder Set', () => {

    render(
        <InputForm
            placeholder={"Test Placeholder"}
        />
    );

    const element = screen.getByTestId('input')
    expect(element.props.placeholder).toBe("Test Placeholder");
});

it('Test init style', () => {

    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={""}
            multiline={false}
        />
    );

    const element = screen.getByTestId('input')

    expect(element).toHaveStyle({
        borderRadius: 32,
        borderColor: '#9B9595',
        borderWidth: 2,
        paddingLeft: 25,
        color: '#9B9595',
        height : '100%',
        width: '100%',
        fontSize : 16,
    })
});


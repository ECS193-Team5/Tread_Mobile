/**
 * @format
 */
import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import InputForm from "../components/test/InputForm";
import { fireEvent, render, screen } from "@testing-library/react-native"


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
            placeholder={"Boo"}
        />
    );

    const element = screen.getByTestId('input')
    expect(element.props.placeholder).toBe("Boo");
});

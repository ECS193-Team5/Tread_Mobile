/**
 * @format
 */
import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import InputForm from "../testComps/shared/InputForm";
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
            name={true}
        />
    );

    const element = screen.getByTestId('input')

    expect(element).toHaveStyle({
        borderRadius: 50,
        borderColor: '#9B9595',
        borderWidth: 2,
        paddingLeft: 25,
        color: '#9B9595',
        height : '100%',
        width: '100%',
        fontSize : 16,
    })
});

it('Test valid style', () => {
    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={"Testing"}
            valid={true}
            multiline={false}
        />
    );

    const element = screen.getByTestId('input')

    expect(element).toHaveStyle({
        borderRadius: 32,
        borderColor: '#014421',
        borderWidth: 2,
        paddingLeft: 25,
        color: '#014421',
        height : '100%',
        width: '100%',
        fontSize : 16,
    })
});

it('Test invalid style', () => {
    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={"Testing/-="}
            valid={false}
            multiline={false}
        />
    );

    const element = screen.getByTestId('input')

    expect(element).toHaveStyle({
        borderRadius: 32,
        borderColor: '#C65656',
        borderWidth: 2,
        paddingLeft: 25,
        color: '#C65656',
        height : '100%',
        width: '100%',
        fontSize : 16,
    })
});

it('Test set value', () => {
    const onValueChangeMock = jest.fn()
    const onValidChangeMock = jest.fn()

    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={""}
            multiline={false}
            setValue={onValueChangeMock}
            setValid={onValidChangeMock}
        />
    );

    const element = screen.getByTestId('input')
    fireEvent(element, 'onChangeText', "Testing");
    expect(onValueChangeMock).toBeCalledWith('Testing')
});

it('Test valid change', () => {
    const onValueChangeMock = jest.fn()
    const onValidChangeMock = jest.fn()

    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={""}
            multiline={false}
            setValue={onValueChangeMock}
            setValid={onValidChangeMock}
        />
    );

    const element = screen.getByTestId('input')
    fireEvent(element, 'onChangeText', "Testing");
    expect(onValueChangeMock).toBeCalled()
});

it('Test invalid change: empty', () => {
    const onValueChangeMock = jest.fn()
    const onValidChangeMock = jest.fn()

    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={""}
            multiline={false}
            setValue={onValueChangeMock}
            setValid={onValidChangeMock}
        />
    );

    const element = screen.getByTestId('input')
    fireEvent(element, 'onChangeText', "");
    expect(onValueChangeMock).toBeCalled()
});

it('Test invalid change: too long', () => {
    const onValueChangeMock = jest.fn()
    const onValidChangeMock = jest.fn()

    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={""}
            multiline={false}
            setValue={onValueChangeMock}
            setValid={onValidChangeMock}
        />
    );

    const element = screen.getByTestId('input')
    fireEvent(element, 'onChangeText', "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    expect(onValueChangeMock).toBeCalled()
});

it('Test invalid change: too long', () => {
    const onValueChangeMock = jest.fn()
    const onValidChangeMock = jest.fn()

    render(
        <InputForm
            placeholder={"Test Placeholder"}
            value={""}
            multiline={false}
            setValue={onValueChangeMock}
            setValid={onValidChangeMock}
        />
    );

    const element = screen.getByTestId('input')
    fireEvent(element, 'onChangeText', "-==");
    expect(onValueChangeMock).toBeCalled()
});

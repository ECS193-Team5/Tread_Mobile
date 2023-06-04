import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import InputForm from "../testComps/shared/InputForm";
import ZeroItem from "../testComps/shared/ZeroItem";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
expect.extend({ toHaveStyle });


it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <ZeroItem
                // value={"Yes"}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});


it('Test onPress', () => {
    const onPressMock = jest.fn()

    render(
       <ZeroItem
           navigateToText={"a"}
           onPress={onPressMock}
       />
    )

    const element = screen.getByTestId('test')
    fireEvent(element, 'onPress');
    expect(onPressMock).toBeCalled()
});
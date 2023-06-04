import 'react-native';
import React from 'react';

import renderer, {act} from 'react-test-renderer';
import Invite from "../testComps/shared/invite";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
import InputForm from "../testComps/shared/InputForm";
expect.extend({ toHaveStyle });

it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <Invite
                text={"test"}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});

it('Test onFriendChange', () => {
    const onFriendChangeMock = jest.fn()

    render(
        <Invite
            text={"test"}
            onFriendChange={onFriendChangeMock}
        />
    );

    const element = screen.getByTestId('friend')
    fireEvent(element, 'onChangeText', "Testing");
    expect(onFriendChangeMock).toBeCalledWith('Testing')
});

it('Test onSubmit', () => {
    const onSubmitMock = jest.fn()

    render(
        <Invite
            text={"test"}
            onSubmit={onSubmitMock}
        />
    );

    const element = screen.getByTestId('submit')
    fireEvent(element, 'onPress');
    expect(onSubmitMock).toBeCalled();
});
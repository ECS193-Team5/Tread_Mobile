import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import ImageUpload from "../testComps/shared/ImageUpload";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
expect.extend({ toHaveStyle });

it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <ImageUpload
                flex={1}
                placeholder={'https://imgur.com/a/5IVD5Ew'}
                picture={'https://imgur.com/a/5IVD5Ew'}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});

it('Test image upload click', () => {
    const onChoosePicPress = jest.fn()


    render(
        <ImageUpload
            flex={1}
            placeholder={'https://imgur.com/a/5IVD5Ew'}
            picture={'https://imgur.com/a/5IVD5Ew'}
            onChoosePicPress={onChoosePicPress}
        />
    );

    const element = screen.getByTestId('input')
    fireEvent(element, 'onPress');
    expect(onChoosePicPress).toBeCalled()
});
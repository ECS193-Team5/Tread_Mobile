import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import AddPage from "../testPages/addPage";
import { toHaveStyle } from "@testing-library/jest-native";
expect.extend({ toHaveStyle });

it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <AddPage

            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});
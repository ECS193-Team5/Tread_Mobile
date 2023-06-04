import 'react-native';
import React from 'react';

import renderer, {act} from 'react-test-renderer';
import Invite from "../testComps/shared/invite";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
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
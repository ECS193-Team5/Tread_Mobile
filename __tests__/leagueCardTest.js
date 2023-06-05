import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import LeagueCard from "../testComps/league/leagueCard";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { toHaveStyle } from "@testing-library/jest-native";
import InputForm from "../testComps/shared/InputForm";
expect.extend({ toHaveStyle });

it('Correct Render', () => {
    let tree = null;

    act(() => {
        tree = renderer.create(
            <LeagueCard
                // value={"Yes"}
            />
        ).toJSON();
    })

    expect(tree).toMatchSnapshot();
});

it('Test set value', () => {
    const leaguePressMock = jest.fn()

    render(
        <LeagueCard
            handleLeaguePress={leaguePressMock}
        />
    );

    const element = screen.getByTestId('league')
    fireEvent(element, 'onPress');
    expect(leaguePressMock).toBeCalled()
});
import React, {useState} from "react";
import {create} from "react-test-renderer";
import InputForm from "../components/shared/InputForm";

test('login button renders correctly', () => {
  const [validUserName, setValidUserName] = useState(false);
  const [userName, setUserName] = useState("");

  const tree  = create(
    <InputForm
      placeholder={'Enter Display Name'}
      value={userName}
      setValue={setUserName}
      valid={validUserName}
      setValid={setValidUserName}
      editable={true}
      allowSpecial={null}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
})
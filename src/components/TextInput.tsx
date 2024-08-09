import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import styled from 'styled-components';

const InputArea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 18px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  resize: none;
  outline: none; 
`;

const TextInput: React.FC = () => {
  const { input, setInput, text } = useContext(AppContext);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <InputArea
      value={input}
      onChange={handleChange}
      disabled={text === "Loading..."} // Disable input while loading text
      spellCheck={false}
    />
  );
};

export default TextInput;

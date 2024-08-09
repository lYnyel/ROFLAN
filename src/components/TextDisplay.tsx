import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import styled from 'styled-components';

const DisplayText = styled.div<{ inputLength: number }>`
  font-size: 18px;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  margin-bottom: 20px;

  span {
    display: inline-block;
  }

  .correct {
    color: #28a745; /* Green for correct characters */
  }

  .incorrect {
    color: #dc3545; /* Red for incorrect characters */
  }

  .current {
    color: #007bff; /* Blue for current input */
  }
`;

const TextDisplay: React.FC = () => {
  const { text, input } = useContext(AppContext);

  const getStyledText = () => {
    let result = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (i < input.length) {
        const inputChar = input[i];
        if (char === inputChar) {
          result.push(<span key={i} className="correct">{char}</span>);
        } else {
          result.push(<span key={i} className="incorrect">{char}</span>);
        }
      } else {
        result.push(<span key={i}>{char}</span>);
      }
    }
    return result;
  };

  return (
    <DisplayText inputLength={input.length}>
      {getStyledText()}
      {text.length > input.length && <span className="current">{text[input.length]}</span>}
    </DisplayText>
  );
};

export default TextDisplay;

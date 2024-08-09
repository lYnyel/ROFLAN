import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import calculateWPM from '../utils/calculateWPM';
import styled from 'styled-components';

const ResultsContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Results: React.FC = () => {
  const { input, text, errors, startTime } = useContext(AppContext);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (startTime !== null) {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000 / 60;
      const wpm = calculateWPM(input, duration);
      setWpm(wpm);
    }
  }, [input, text, startTime]);

  return (
    <ResultsContainer>
      <h2>Results</h2>
      <p>WPM: {wpm.toFixed(2)}</p>
      <p>Errors: {errors}</p>
    </ResultsContainer>
  );
};

export default Results;

import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import TextDisplay from './components/TextDisplay';
import TextInput from './components/TextInput';
import Results from './components/Results';
import GlobalStyles from './styles/GlobalStyles';
import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  gap: 10px; /* Расстояние между кнопками */
  margin-top: 20px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
`;

const Timer = styled.div`
  font-size: 20px;
  margin-top: 10px;
`;

const TimeSelector = styled.select`
  margin-top: 10px;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #ffffff;
`;

const AppContent: React.FC = () => {
  const { reset, timeLeft, setTimeLeft, isTimeUp } = useContext(AppContext);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeLeft(parseInt(e.target.value));
  };

  return (
    <>
      <h1>Typing Speed Trainer</h1>
      <TextDisplay />
      <TextInput />
      <div className='Buttons'>
      <Timer>Time left: {timeLeft}s</Timer>
      <TimeSelector onChange={handleTimeChange}>
        <option value={15}>15 seconds</option>
        <option value={30}>30 seconds</option>
        <option value={60}>60 seconds</option>
      </TimeSelector>
      <ButtonContainer>
      <Button onClick={reset}>Restart</Button>
      {isTimeUp && <Results />}
      </ButtonContainer>
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <GlobalStyles />
      <Container>
        <AppContent />
      </Container>
    </AppProvider>
  );
};

export default App;

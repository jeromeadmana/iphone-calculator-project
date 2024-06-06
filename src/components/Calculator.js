import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CalculatorButton from './CalculatorButton';
import './Calculator.scss';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleButtonClick = (value) => {
    if (!isNaN(value)) {
      handleNumber(value);
    } else {
      handleOperator(value);
    }
  };

  const handleNumber = (number) => {
    if (waitingForSecondOperand) {
      setDisplay(number);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const handleOperator = (nextOperator) => {
    if (nextOperator === 'AC') {
      setDisplay('0');
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      return;
    }

    if (nextOperator === '+/-') {
      setDisplay((parseFloat(display) * -1).toString());
      return;
    }

    if (nextOperator === '%') {
      setDisplay((parseFloat(display) / 100).toString());
      return;
    }

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand == null) {
      setFirstOperand(parseFloat(display));
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, parseFloat(display));
      setDisplay(result.toString());
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (operator, firstOperand, secondOperand) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  return (
    <Box className="calculator">
      <Typography variant="h3" className="display">
        {display}
      </Typography>
      <Grid container spacing={1} className="buttons">
        {['AC', '+/-', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
          <Grid item xs={btn === '0' ? 6 : 3} key={btn}>
            <CalculatorButton value={btn} onClick={handleButtonClick} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calculator;

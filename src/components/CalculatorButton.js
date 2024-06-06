import React from 'react';
import { Button } from '@mui/material';
import './CalculatorButton.scss';

const CalculatorButton = ({ value, onClick }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <Button
      className={`calculator-button ${isNaN(value) ? 'operator' : 'number'}`}
      onClick={handleClick}
      variant="contained"
      sx={{
        backgroundColor: isNaN(value) ? '#f5913e' : '#333',
        flexBasis: value === '0' ? '48%' : '21%',
        height: '60px',
      }}
    >
      {value}
    </Button>
  );
};

export default CalculatorButton;

import React from 'react';
import { Button, Zoom } from '@mui/material';

const BottomButton = ({ text, isActive, onClick }) => {
  return (
    <Zoom in={true}>
      <Button 
        variant="contained"
        color={isActive ? "primary" : "secondary"}
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          right: 16,
          maxWidth: 400,
          margin: '0 auto',
          borderRadius: 3,
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: isActive ? 5 : 2,
          minHeight: '52px',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: 8
          }
        }}
      >
        {text}
      </Button>
    </Zoom>
  );
};

export default BottomButton;

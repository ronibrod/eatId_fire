import React from 'react';
import { Button } from '@mui/material';

const Option = ({ value, label, isSelected, onClick, size = 'medium' }) => {
  // Determine size properties based on size prop
  const sizeProps = {
    fontSize: size === 'small' ? '0.8125rem' : '0.875rem', 
    minHeight: size === 'small' ? '32px' : '40px',
    px: size === 'small' ? 1.5 : 2,
    py: size === 'small' ? 0.5 : 1
  };
  
  return (
    <Button 
      variant={isSelected ? "contained" : "outlined"}
      color="primary"
      onClick={onClick}
      sx={{
        borderRadius: '20px',
        textTransform: 'none',
        ...sizeProps,
        fontWeight: isSelected ? 600 : 500,
        boxShadow: isSelected ? 2 : 'none',
        minWidth: '70px',
        maxWidth: '200px',
        flexShrink: 0,
        flexGrow: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 1
        },
        '&:active': {
          transform: 'translateY(1px)'
        }
      }}
    >
      {label}
    </Button>
  );
};

export default Option;

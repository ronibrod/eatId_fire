import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField,
  Button,
  Stack,
  Paper
} from '@mui/material';

const CustomInput = ({ placeholder, onAdd, onCancel }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  
  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{ 
        p: 2, 
        backgroundColor: 'rgba(255, 229, 159, 0.1)',
        border: '2px solid #FFE59F',
        borderRadius: 2
      }}
      onClick={(e) => e.stopPropagation()} // Prevent closing the question
    >
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          inputRef={inputRef}
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          variant="outlined"
          size="small"
          InputProps={{
            sx: { 
              borderRadius: 1.5,
              backgroundColor: 'white',
              direction: 'rtl',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFE59F',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E3B719',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E3B719',
                borderWidth: 2,
              }
            }
          }}
          sx={{ mb: 1 }}
          onClick={(e) => e.stopPropagation()}
        />
        
        <Stack direction="row" spacing={1}>
          <Button 
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleSubmit(e);
            }}
            sx={{ textTransform: 'none', borderRadius: 1 }}
          >
            הוסף
          </Button>
          
          <Button 
            type="button"
            variant="outlined"
            color="secondary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            sx={{ textTransform: 'none', borderRadius: 1 }}
          >
            בטל
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CustomInput;

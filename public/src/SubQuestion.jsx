import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Stack,
  Divider,
  Fade
} from '@mui/material';
import Option from './components/Option';
import CustomInput from './CustomInput';

const SubQuestion = ({
  mainOption,
  config,
  selectedOptions = [],
  onSelectOption,
  onAddCustomOption,
  subCategories = null,
  subSelections = {},
  onSelectNestedSubOption,
  level = 2
}) => {
  const [customInput, setCustomInput] = useState(false);
  
  // Calculate left padding based on nesting level
  const borderStyle = {
    pr: level * 1.5,
    mr: 1,
    mt: 2,
    mb: 2,
    borderRight: '3px solid',
    borderRightColor: `rgba(227, 183, 25, ${0.2 + (level * 0.1)})`,
  };
  
  // Handle option selection
  const handleOptionClick = (e, optionValue) => {
    e.stopPropagation();
    
    // If "אחר" or "משהו אחר" option is clicked, show the custom input
    if (optionValue === 'אחר' || optionValue === 'משהו אחר') {
      setCustomInput(true);
      return;
    }
    
    const isSelected = !selectedOptions.includes(optionValue);
    
    // If not a multiple selection type, deselect all others first
    if (!config.multiple && isSelected) {
      // Clear previous selections
      selectedOptions.forEach(option => {
        if (option !== optionValue) {
          onSelectOption(option, false);
        }
      });
    }
    
    onSelectOption(optionValue, isSelected);
  };
  
  // Handle adding a custom value
  const handleAddCustom = (value) => {
    if (value.trim()) {
      onAddCustomOption(value);
    }
    setCustomInput(false);
  };
  
  // Handle canceling custom input
  const handleCancelCustom = () => {
    setCustomInput(false);
  };
  
  // Only show component if there are selected options or we're at the first level
  const shouldShow = level <= 2 || selectedOptions.length > 0;
  
  return (
    <Fade in={shouldShow}>
      <Box sx={borderStyle}>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: 500,
            color: 'text.primary',
            mb: 1.5
          }}
        >
          {config.text}
        </Typography>
        
        <Box sx={{ pl: 0.5 }}>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              flexWrap: 'wrap', 
              gap: 1, 
              mb: 2, 
              '& > *': { mb: 1 } 
            }}
          >
            {config.options.map((option) => (
              <Option
                key={option}
                value={option}
                label={option}
                isSelected={selectedOptions.includes(option)}
                onClick={(e) => handleOptionClick(e, option)}
                size="small"
              />
            ))}
          </Stack>
          
          {/* Custom input for "אחר" or "משהו אחר" option */}
          {customInput && (
            <Fade in={customInput}>
              <Box sx={{ mb: 2 }}>
                <CustomInput
                  placeholder={config.customPlaceholder || 'הוסף אפשרות אחרת'}
                  onAdd={handleAddCustom}
                  onCancel={handleCancelCustom}
                />
              </Box>
            </Fade>
          )}
          
          {/* Nested sub-questions for options with subCategories (level 3+) */}
          {subCategories && selectedOptions.map(option => (
            subCategories[option] && (
              <Box key={option} sx={{ ml: 1 }}>
                <SubQuestion
                  mainOption={`${mainOption}_${option}`}
                  config={subCategories[option]}
                  selectedOptions={(subSelections[`${mainOption}_${option}`] || [])}
                  onSelectOption={(subOption, isSelected) => {
                    onSelectNestedSubOption(option, subOption, isSelected);
                  }}
                  onAddCustomOption={(customValue) => {
                    onSelectNestedSubOption(option, customValue, true);
                  }}
                  level={level + 1}
                />
              </Box>
            )
          ))}
        </Box>
      </Box>
    </Fade>
  );
};

export default SubQuestion;

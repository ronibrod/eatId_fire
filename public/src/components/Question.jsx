import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Collapse, 
  Chip,
  Paper,
  Stack,
  Divider,
  Fade
} from '@mui/material';
import Option from './Option';
import CustomInput from './CustomInput';
import SubQuestion from './SubQuestion';

const Question = ({
  id,
  isActive,
  title,
  helperText,
  options,
  selectedOptions = [],
  onSelectOption,
  onOpen,
  subQuestions = {},
  subSelections = {},
  onSelectSubOption,
  onAddCustomOption,
  formatListText
}) => {
  const [customInput, setCustomInput] = useState(false);
  const questionRef = useRef(null);

  // Check if this question has an answer or is in helper mode
  const hasAnswer = selectedOptions && selectedOptions.length > 0;

  // Get the formatted answer text if there are selections
  const getAnswerText = () => {
    if (!hasAnswer) return helperText;

    if (id === 1) { // Food question
      // For food - show each main selection with its sub-selections
      const parts = [];
      selectedOptions.forEach(item => {
        let text = item;
        const subKey = `foodSub_${item}`;
        if (subSelections[subKey] && subSelections[subKey].length > 0) {
          const config = subQuestions[item];
          const joinType = config ? config.joinType : 'and';
          const subText = formatListText(subSelections[subKey], joinType);
          text += ': ' + subText;
        }
        parts.push(text);
      });
      
      return formatListText(parts, 'and');
    } else if (id === 2) { // Restrictions question
      // For restrictions - show each main selection with its sub-selections
      const parts = [];
      selectedOptions.forEach(item => {
        let text = item;
        
        // Check for direct sub-selections
        if (subSelections[item] && subSelections[item].length > 0) {
          text += ': ' + formatListText(subSelections[item], 'and');
        }
        
        // Check for nested sub-selections
        Object.keys(subSelections).forEach(subKey => {
          if (subKey.startsWith(item + '_') && subSelections[subKey].length > 0) {
            text += ' (' + formatListText(subSelections[subKey], 'and') + ')';
          }
        });
        
        parts.push(text);
      });
      
      return formatListText(parts, 'and');
    } else {
      // For additional preferences - simple list
      return formatListText(selectedOptions, 'and');
    }
  };

  // Handle option selection
  const handleOptionClick = (optionValue) => {
    // If "אחר" option is clicked, show the custom input
    if (optionValue === 'אחר' || optionValue === 'משהו אחר') {
      setCustomInput(true);
      return;
    }
    
    const isSelected = !selectedOptions.includes(optionValue);
    onSelectOption(optionValue, isSelected);
  };

  // Handle adding a custom value
  const handleAddCustom = (value) => {
    if (value.trim()) {
      onAddCustomOption('אחר', value);
    }
    setCustomInput(false);
  };

  // Handle canceling custom input
  const handleCancelCustom = () => {
    setCustomInput(false);
  };

  // Ensure content is visible when sub-questions are displayed
  useEffect(() => {
    if (isActive && questionRef.current) {
      const ensureContentVisible = () => {
        const rect = questionRef.current.getBoundingClientRect();
        const buttonHeight = 100; // Space for the bottom button
        
        if (rect.bottom > window.innerHeight - buttonHeight || rect.top < 0) {
          questionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      };
      
      // Add a small delay to ensure DOM updates before scrolling
      const timeoutId = setTimeout(ensureContentVisible, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [isActive, subSelections]);

  return (
    <Paper
      ref={questionRef}
      elevation={isActive ? 1 : 0}
      sx={{
        mb: 3,
        p: 2,
        cursor: 'pointer',
        borderRadius: 2,
        border: '1px solid',
        borderColor: isActive ? 'primary.light' : 'transparent',
        backgroundColor: isActive ? 'background.paper' : 'rgba(250, 243, 221, 0.3)',
        opacity: isActive ? 1 : 0.9,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: isActive 
            ? 'background.paper' 
            : 'rgba(250, 243, 221, 0.5)',
          borderColor: 'primary.light',
          opacity: 1,
          transform: 'translateY(-2px)',
          boxShadow: 1
        }
      }}
      onClick={() => onOpen(id)}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: isActive ? 2 : 0 }}>
        <Typography 
          component="div" 
          variant="body1"
          sx={{ 
            fontWeight: 500, 
            color: 'text.primary',
            flexGrow: 1
          }}
        >
          {title}{' '}
          <Chip
            label={getAnswerText()}
            size="small"
            color={hasAnswer ? "primary" : "default"}
            variant={hasAnswer ? "filled" : "outlined"}
            sx={{
              fontStyle: hasAnswer ? 'normal' : 'italic',
              color: hasAnswer ? 'white' : 'text.secondary',
              mr: 0.5,
              ml: 0.5,
              fontWeight: hasAnswer ? 500 : 400,
              fontSize: '0.85rem',
            }}
          />
        </Typography>
      </Box>
      
      <Collapse in={isActive} timeout={500}>
        <Box sx={{ pt: 1 }}>
          {/* Options for the main question */}
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ 
              flexWrap: 'wrap', 
              gap: 1, 
              mb: 2, 
              '& > *': { mb: 1 } // Add spacing between wrapped items
            }}
          >
            {options.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                label={option.label}
                isSelected={selectedOptions.includes(option.value)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleOptionClick(option.value);
                }}
              />
            ))}
          </Stack>
          
          {/* Custom input for "אחר" option */}
          {customInput && (
            <Fade in={customInput}>
              <Box sx={{ mb: 2 }}>
                <CustomInput
                  placeholder={`הוסף ${id === 1 ? 'אוכל' : id === 2 ? 'הגבלה' : 'העדפה'} אחר/ת`}
                  onAdd={handleAddCustom}
                  onCancel={handleCancelCustom}
                />
              </Box>
            </Fade>
          )}
          
          {/* Sub-questions for food options */}
          {id === 1 && (
            <Box>
              {selectedOptions.map(option => (
                subQuestions[option] && (
                  <Fade key={option} in={true}>
                    <Box onClick={(e) => e.stopPropagation()}>
                      <SubQuestion
                        mainOption={option}
                        config={subQuestions[option]}
                        selectedOptions={subSelections[`foodSub_${option}`] || []}
                        onSelectOption={(subOption, isSelected) => onSelectSubOption(option, subOption, isSelected)}
                        onAddCustomOption={(customValue) => onSelectSubOption(option, customValue, true)}
                        level={2}
                      />
                    </Box>
                  </Fade>
                )
              ))}
            </Box>
          )}
          
          {/* Sub-questions for restriction options */}
          {id === 2 && (
            <Box>
              {selectedOptions.map(option => (
                subQuestions[option] && (
                  <Fade key={option} in={true}>
                    <Box onClick={(e) => e.stopPropagation()}>
                      <SubQuestion
                        mainOption={option}
                        config={subQuestions[option]}
                        selectedOptions={subSelections[option] || []}
                        onSelectOption={(subOption, isSelected) => onSelectSubOption(option, subOption, isSelected)}
                        onAddCustomOption={(customValue) => onSelectSubOption(option, customValue, true)}
                        subCategories={subQuestions[option].subCategories}
                        subSelections={subSelections}
                        onSelectNestedSubOption={(nestedOption, subOption, isSelected) => {
                          const nestedKey = `${option}_${nestedOption}`;
                          onSelectSubOption(nestedKey, subOption, isSelected, 2, option);
                        }}
                        level={2}
                      />
                    </Box>
                  </Fade>
                )
              ))}
            </Box>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default Question;

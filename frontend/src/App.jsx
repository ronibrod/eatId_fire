import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  ThemeProvider,
  CssBaseline,
  Fade
} from '@mui/material';

// Import components
import Question from './components/Question';
import BottomButton from './components/BottomButton';

import theme from './theme';
import {
  foodSubQuestions,
  restrictionsSubQuestions,
  foodOptions,
  restrictionOptions,
  additionalOptions,
  formatListText
} from './data/questionsdata';

// Main App component
const App = () => {
  // State for tracking the current open question
  const [currentQuestion, setCurrentQuestion] = useState(1);

  // State for storing all user selections
  const [selections, setSelections] = useState({
    food: [],
    restrictions: [],
    additional: [],
    foodSub: {},
    restrictionsSub: {}
  });

  // Function to handle opening a specific question
  const handleOpenQuestion = (questionNum) => {
    setCurrentQuestion(questionNum);
  };

  // Function to handle food option selection
  const handleSelectFood = (option, isSelected) => {
    setSelections(prev => {
      const newFood = isSelected
        ? [...prev.food, option]
        : prev.food.filter(item => item !== option);

      return { ...prev, food: newFood };
    });
  };

  // Function to handle restriction option selection
  const handleSelectRestriction = (option, isSelected) => {
    setSelections(prev => {
      const newRestrictions = isSelected
        ? [...prev.restrictions, option]
        : prev.restrictions.filter(item => item !== option);

      return { ...prev, restrictions: newRestrictions };
    });
  };

  // Function to handle additional option selection
  const handleSelectAdditional = (option, isSelected) => {
    setSelections(prev => {
      const newAdditional = isSelected
        ? [...prev.additional, option]
        : prev.additional.filter(item => item !== option);

      return { ...prev, additional: newAdditional };
    });
  };

  // Function to handle sub-question selections for food
  const handleSelectFoodSub = (mainOption, subOption, isSelected) => {
    const subKey = `foodSub_${mainOption}`;

    setSelections(prev => {
      const currentSubSelections = prev.foodSub[subKey] || [];
      const newSubSelections = isSelected
        ? [...currentSubSelections, subOption]
        : currentSubSelections.filter(item => item !== subOption);

      return {
        ...prev,
        foodSub: {
          ...prev.foodSub,
          [subKey]: newSubSelections
        }
      };
    });
  };

  // Function to handle sub-question selections for restrictions
  const handleSelectRestrictionSub = (mainOption, subOption, isSelected, level = 1, parentKey = '') => {
    const subKey = level === 1 ? mainOption : `${parentKey}_${subOption}`;

    setSelections(prev => {
      const currentSubSelections = prev.restrictionsSub[subKey] || [];
      const newSubSelections = isSelected
        ? [...currentSubSelections, subOption]
        : currentSubSelections.filter(item => item !== subOption);

      return {
        ...prev,
        restrictionsSub: {
          ...prev.restrictionsSub,
          [subKey]: newSubSelections
        }
      };
    });
  };

  // Function to add custom option for food
  const handleAddCustomFood = (option, customValue) => {
    handleSelectFood(customValue, true);
  };

  // Function to add custom option for restrictions
  const handleAddCustomRestriction = (option, customValue) => {
    handleSelectRestriction(customValue, true);
  };

  // Function to add custom option for additional preferences
  const handleAddCustomAdditional = (customValue) => {
    handleSelectAdditional(customValue, true);
  };

  // Function to show results
  const showResults = () => {
    // Build a comprehensive results summary
    let resultsText = 'מעבר לתפריט המותאם אישית! 🍽️\n\nהבחירות שלך:\n\n';

    // Food preferences
    if (selections.food && selections.food.length > 0) {
      resultsText += '🍽️ אוכל: ' + formatListText(selections.food, 'and');

      // Add food sub-preferences
      selections.food.forEach(food => {
        const subKey = `foodSub_${food}`;
        if (selections.foodSub[subKey] && selections.foodSub[subKey].length > 0) {
          const config = foodSubQuestions[food];
          const joinType = config ? config.joinType : 'and';
          resultsText += '\n   • ' + food + ': ' + formatListText(selections.foodSub[subKey], joinType);
        }
      });
      resultsText += '\n\n';
    }

    // Restrictions
    if (selections.restrictions && selections.restrictions.length > 0) {
      resultsText += '🚫 הגבלות: ' + formatListText(selections.restrictions, 'and');

      // Add restriction details
      selections.restrictions.forEach(restriction => {
        if (selections.restrictionsSub[restriction] && selections.restrictionsSub[restriction].length > 0) {
          resultsText += '\n   • ' + restriction + ': ' + formatListText(selections.restrictionsSub[restriction], 'and');
        }

        // Check for deeper restrictions
        Object.keys(selections.restrictionsSub).forEach(subKey => {
          if (subKey.startsWith(restriction + '_') && selections.restrictionsSub[subKey].length > 0) {
            const keyParts = subKey.split('_');
            if (keyParts.length >= 3) {
              resultsText += '\n     ◦ ' + keyParts.slice(-1)[0] + ': ' + formatListText(selections.restrictionsSub[subKey], 'and');
            }
          }
        });
      });
      resultsText += '\n\n';
    }

    // Additional preferences
    if (selections.additional && selections.additional.length > 0) {
      resultsText += '✨ חשוב גם: ' + formatListText(selections.additional, 'and');
    }

    alert(resultsText);
  };

  // Function to skip to the full menu
  const skipToFullMenu = () => {
    alert('מעבר לתפריט המלא...');
  };

  // Check if we need to activate the bottom button based on selections
  const hasSelections =
    (Array.isArray(selections.food) && selections.food.length > 0) ||
    (Array.isArray(selections.restrictions) && selections.restrictions.length > 0) ||
    (Array.isArray(selections.additional) && selections.additional.length > 0);

  // Update bottom button text based on selections
  const bottomButtonText = hasSelections
    ? 'סיימתי - תראה לי את התפריט המותאם'
    : 'לעבור לתפריט המלא';

  // Update bottom button action based on selections
  const bottomButtonAction = hasSelections ? showResults : skipToFullMenu;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{
        pt: 2,
        // pb: 15, // space for bottom button 
        minHeight: '100vh',
        direction: 'rtl'
      }}>
        <Paper
          sx={{
            p: 3,
            maxHeight: '95vh',
            overflow: 'auto',
            borderRadius: 3,
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
              שמחים לארח אותך אצלנו
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              המלצר הוירטואלי יסמן את מה שבדיוק מתאים לך
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              💡 לחיצה על שאלה תפתח או תסגור אותה
            </Typography>
          </Box>

          <Box
            sx={{
              mb: 4,
              maxHeight: '70vh',
              overflow: 'auto',
              scrollbarWidth: 'none', // Firefox
              '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari
            }}
          >
            {/* Question 1: בא לי לאכול */}
            <Fade in={true} style={{ transitionDelay: '100ms' }}>
              <Box>
                <Question
                  id={1}
                  isActive={currentQuestion === 1}
                  title="בא לי לאכול היום"
                  helperText="בחר אופציה אחת או יותר"
                  options={foodOptions}
                  selectedOptions={selections.food}
                  onSelectOption={handleSelectFood}
                  onOpen={() => handleOpenQuestion(1)}
                  subQuestions={foodSubQuestions}
                  subSelections={selections.foodSub}
                  onSelectSubOption={handleSelectFoodSub}
                  onAddCustomOption={handleAddCustomFood}
                  formatListText={formatListText}
                />
              </Box>
            </Fade>

            {/* Question 2: הגבלות באוכל */}
            <Fade in={true} style={{ transitionDelay: '200ms' }}>
              <Box>
                <Question
                  id={2}
                  isActive={currentQuestion === 2}
                  title="יש לך הגבלות באוכל:"
                  helperText="בחר את כל האופציות הרלוונטיות"
                  options={restrictionOptions}
                  selectedOptions={selections.restrictions}
                  onSelectOption={handleSelectRestriction}
                  onOpen={() => handleOpenQuestion(2)}
                  subQuestions={restrictionsSubQuestions}
                  subSelections={selections.restrictionsSub}
                  onSelectSubOption={handleSelectRestrictionSub}
                  onAddCustomOption={handleAddCustomRestriction}
                  formatListText={formatListText}
                />
              </Box>
            </Fade>

            {/* Question 3: חשוב לי גם */}
            <Fade in={true} style={{ transitionDelay: '300ms' }}>
              <Box>
                <Question
                  id={3}
                  isActive={currentQuestion === 3}
                  title="חשוב לי גם:"
                  helperText="בחר את כל האופציות הרלוונטיות"
                  options={additionalOptions}
                  selectedOptions={selections.additional}
                  onSelectOption={handleSelectAdditional}
                  onOpen={() => handleOpenQuestion(3)}
                  onAddCustomOption={handleAddCustomAdditional}
                  formatListText={formatListText}
                />
              </Box>
            </Fade>
          </Box>
        </Paper>

        <BottomButton
          text={bottomButtonText}
          isActive={hasSelections}
          onClick={bottomButtonAction}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;

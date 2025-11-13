// Configuration for food sub-questions
export const foodSubQuestions = {
  'בקטנה': {
    text: 'בקטנה זה אומר',
    options: ['משקה חם', 'משקה קר', 'משקה אלכוהולי', 'נשנוש', 'קינוח', 'מנה קטנה או ראשונה'],
    multiple: true,
    joinType: 'or',
    customPlaceholder: 'מה בא לך?'
  },
  'בריא': {
    text: 'בריא מבחינתי זה',
    options: ['סלטים', 'בלי שומן', 'בלי צבעי מאכל', 'עשיר בחלבון', 'דגנים מלאים', 'מרכיבים טריים', 'לא מטוגן'],
    multiple: true,
    joinType: 'and',
    customPlaceholder: 'איזה מאפיין בריא?'
  },
  'משהו מיוחד': {
    text: 'מיוחד הכוונה היא ל',
    options: ['מטבח שונה', 'שילוב טעמים', 'דבר שלא מכיר', 'מנה יצירתית'],
    multiple: true,
    joinType: 'or',
    customPlaceholder: 'איזה סוג של חוויה מיוחדת?'
  },
  'משהו משביע': {
    text: 'ואני רוצה שזה יהיה',
    options: ['עם בשר', 'עם פחמימות', 'מנה גדולה', 'שיחזיק אותי'],
    multiple: true,
    joinType: 'and',
    customPlaceholder: 'איזה סוג של אוכל משביע?'
  },
  'מאכל מסוים': {
    text: 'איזה מאכל',
    options: ['פיצה', 'פסטה', 'המבורגר', 'סושי', 'סלט', 'מרק', 'סטייק'],
    multiple: false,
    joinType: 'or',
    customPlaceholder: 'איזה מאכל ספציפי?'
  }
};

// Configuration for restriction sub-questions
export const restrictionsSubQuestions = {
  'כן, יש דברים שהם לא בשבילי': {
    text: 'מה לא בשבילך',
    options: ['מרכיבים', 'מרקמים', 'סוגי מאכלים', 'מטבחים'],
    multiple: true,
    subCategories: {
      'מרכיבים': {
        text: 'איזה מרכיבים',
        options: ['כוסברה', 'טחינה', 'במיה', 'חצילים', 'בצל', 'גבינה', 'שום', 'משהו אחר'],
        customPlaceholder: 'איזה מרכיב?'
      },
      'מרקמים': {
        text: 'איזה מרקמים',
        options: ['רך', 'קשה', 'פריך', 'דביק'],
        customPlaceholder: 'איזה מרקם?'
      },
      'סוגי מאכלים': {
        text: 'איזה אוכל',
        options: ['לחמים', 'פסטות', 'קינוחים', 'משהו אחר'],
        customPlaceholder: 'איזה סוג אוכל?'
      },
      'מטבחים': {
        text: 'איזה מטבח',
        options: ['הודי', 'תאילנדי', 'מקסיקני', 'איטלקי', 'משהו אחר'],
        customPlaceholder: 'איזה מטבח?'
      }
    }
  },
  'כן, יש לי תזונה מסוימת': {
    text: 'איזו תזונה',
    options: ['צמחוני', 'טבעוני', 'פליאו', 'קטו', 'דל פחמימות', 'דל שומן'],
    multiple: false
  },
  'כן, יש לי אלרגיה או מזון שאסור לי לאכול': {
    text: 'למה יש לך רגישות או אלרגיה',
    options: ['גלוטן', 'לקטוז', 'אגוזים', 'סויה', 'ביצים', 'משהו אחר'],
    multiple: true,
    customPlaceholder: 'למה יש לך רגישות?'
  },
  'כן, מטעמי דת או אמונה': {
    text: 'איזו מגבלה',
    options: ['כשרות', 'חלאל', 'נמנע מבשר', 'משהו אחר'],
    multiple: true,
    customPlaceholder: 'איזו מגבלה דתית?'
  }
};

// Primary question 1: Food options
export const foodOptions = [
  { value: 'לא יודע', label: 'לא יודע' },
  { value: 'בקטנה', label: 'בקטנה' },
  { value: 'בריא', label: 'בריא' },
  { value: 'משהו מיוחד', label: 'משהו מיוחד' },
  { value: 'המלצת השף', label: 'המלצת השף' },
  { value: 'משהו משביע', label: 'משהו משביע' },
  { value: 'מאכל מסוים', label: 'מאכל מסוים' },
  { value: 'אחר', label: 'אחר' }
];

// Primary question 2: Restriction options
export const restrictionOptions = [
  { value: 'לא, אין לי הגבלות', label: 'לא, אין לי הגבלות' },
  { value: 'כן, יש דברים שהם לא בשבילי', label: 'כן, יש דברים שהם לא בשבילי' },
  { value: 'כן, יש לי תזונה מסוימת', label: 'כן, יש לי תזונה מסוימת' },
  { value: 'כן, יש לי אלרגיה או מזון שאסור לי לאכול', label: 'כן, יש לי אלרגיה או מזון שאסור לי לאכול' },
  { value: 'כן, מטעמי דת או אמונה', label: 'כן, מטעמי דת או אמונה' }
];

// Primary question 3: Additional options
export const additionalOptions = [
  { value: 'שלא ילכלך', label: 'שלא ילכלך' },
  { value: 'שזה משהו שאפשר לחלוק', label: 'שזה משהו שאפשר לחלוק' },
  { value: 'שיש משהו מתאים למישהו שאוכל איתי', label: 'שיש משהו מתאים למישהו שאוכל איתי' },
  { value: 'משהו אחר', label: 'משהו אחר' }
];

// Helper function to format text lists with proper Hebrew grammar
export const formatListText = (items, joinType) => {
  if (!items || items.length === 0) return '';
  
  if (items.length === 1) return items[0];
  
  if (joinType === 'and') {
    if (items.length === 2) {
      return items[0] + ' ו' + items[1];
    } else {
      const lastItem = items[items.length - 1];
      const otherItems = items.slice(0, -1).join(', ');
      return otherItems + ' ו' + lastItem;
    }
  } else { // joinType === 'or'
    if (items.length === 2) {
      return items[0] + ' או ' + items[1];
    } else {
      const lastItem = items[items.length - 1];
      const otherItems = items.slice(0, -1).join(', ');
      return otherItems + ' או ' + lastItem;
    }
  }
};

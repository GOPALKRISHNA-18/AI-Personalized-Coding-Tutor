import {
  conceptDefinitions,
  exerciseConceptMap,
  fallbackChips
} from '../data/chatQuestionsData.js';

export const getTutorReply = (message) => {
  const text = (message || '').trim().toLowerCase();
  if (!text) {
    return {
      text: 'Please ask about a programming concept to see its definition.',
      chips: fallbackChips
    };
  }

  const isAskingForCode = /(write.*code|give.*code|show.*code|code for|syntax|program for|solution for|give me code|code snippet|source code)/i.test(text);
  if (isAskingForCode) {
    return {
      text: 'This tutor gives definitions only; code should be written in the Code Editor.',
      chips: []
    };
  }

  for (const exKey of Object.keys(exerciseConceptMap)) {
    if (text.includes(exKey)) {
      return {
        text: exerciseConceptMap[exKey],
        chips: []
      };
    }
  }

  for (const key of Object.keys(conceptDefinitions)) {
    const item = conceptDefinitions[key];
    if (text === key || text === item.title.toLowerCase()) {
      return {
        text: item.definition,
        chips: []
      };
    }
  }

  for (const key of Object.keys(conceptDefinitions)) {
    const item = conceptDefinitions[key];
    const matchesKeyword = item.keywords.some((kw) => {
      if (kw === 'c' || kw === 'js') {
        return new RegExp(`\\b${kw}\\b`, 'i').test(text);
      }
      return text.includes(kw);
    });
    if (matchesKeyword) {
      return {
        text: item.definition,
        chips: []
      };
    }
  }

  return {
    text: 'Please ask about a programming concept to see its definition.',
    chips: fallbackChips
  };
};

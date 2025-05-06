import AsyncStorage from '@react-native-async-storage/async-storage';
import { Word } from '@/types/word';

const HISTORY_STORAGE_KEY = 'word_history';

/**
 * Save a word to the history
 */
export const saveWord = async (word: Word): Promise<void> => {
  try {
    // Get existing history
    const historyString = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    let history: Word[] = [];
    
    if (historyString) {
      history = JSON.parse(historyString);
    }
    
    // Check if word already exists in history
    const existingIndex = history.findIndex(item => item.word === word.word);
    
    if (existingIndex !== -1) {
      // Update existing word with new date
      history[existingIndex] = { ...word, date: new Date().toISOString() };
    } else {
      // Add new word to the beginning of the array
      history.unshift(word);
    }
    
    // Save updated history
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving word to history:', error);
    throw error;
  }
};

/**
 * Get all words from history
 */
export const getWordHistory = async (): Promise<Word[]> => {
  try {
    const historyString = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    
    if (!historyString) {
      return [];
    }
    
    return JSON.parse(historyString);
  } catch (error) {
    console.error('Error getting word history:', error);
    throw error;
  }
};

/**
 * Clear all words from history
 */
export const clearWordHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing word history:', error);
    throw error;
  }
};
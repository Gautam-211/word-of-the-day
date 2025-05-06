import { Word } from '@/types/word';
import { generateUniqueId } from '@/utils/idUtils';

// API endpoint
const API_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// List of common words to fetch when the API fails
const FALLBACK_WORDS: Word[] = [
  {
    id: generateUniqueId(),
    word: 'serendipity',
    definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    example: 'A fortunate stroke of serendipity came her way when she least expected it.',
    partOfSpeech: 'noun',
    phonetic: '/ˌsɛr.ənˈdɪp.ɪ.ti/',
    date: new Date().toISOString()
  },
  {
    id: generateUniqueId(),
    word: 'ephemeral',
    definition: 'Lasting for a very short time.',
    example: 'The ephemeral nature of fashion trends makes it hard to keep up.',
    partOfSpeech: 'adjective',
    phonetic: '/ɪˈfɛm.ər.əl/',
    date: new Date().toISOString()
  },
  {
    id: generateUniqueId(),
    word: 'ubiquitous',
    definition: 'Present, appearing, or found everywhere.',
    example: 'Mobile phones have become ubiquitous in modern society.',
    partOfSpeech: 'adjective',
    phonetic: '/juːˈbɪk.wɪ.təs/',
    date: new Date().toISOString()
  },
  {
    id: generateUniqueId(),
    word: 'eloquent',
    definition: 'Fluent or persuasive in speaking or writing.',
    example: 'Her eloquent speech moved the entire audience to tears.',
    partOfSpeech: 'adjective',
    phonetic: '/ˈɛl.ə.kwənt/',
    date: new Date().toISOString()
  },
  {
    id: generateUniqueId(),
    word: 'resilience',
    definition: 'The capacity to recover quickly from difficulties; toughness.',
    example: 'The resilience of the human spirit is truly remarkable.',
    partOfSpeech: 'noun',
    phonetic: '/rɪˈzɪl.i.əns/',
    date: new Date().toISOString()
  }
];

// List of common words to randomly select from
const COMMON_WORDS = [
  'time', 'year', 'people', 'way', 'day', 'man', 'thing', 'woman', 'life', 'child',
  'world', 'school', 'state', 'family', 'student', 'group', 'country', 'problem', 'hand', 'part',
  'place', 'case', 'week', 'company', 'system', 'program', 'question', 'work', 'government', 'number',
  'night', 'point', 'home', 'water', 'room', 'mother', 'area', 'money', 'story', 'fact',
  'month', 'lot', 'right', 'study', 'book', 'eye', 'job', 'word', 'business', 'issue',
  'side', 'kind', 'head', 'house', 'service', 'friend', 'father', 'power', 'hour', 'game',
  'line', 'end', 'member', 'law', 'car', 'city', 'community', 'name', 'president', 'team',
  'minute', 'idea', 'kid', 'body', 'information', 'back', 'parent', 'face', 'others', 'level',
  'office', 'door', 'health', 'person', 'art', 'war', 'history', 'party', 'result', 'change',
  'morning', 'reason', 'research', 'girl', 'guy', 'moment', 'air', 'teacher', 'force', 'education'
];

/**
 * Get a random word from the dictionary API or fallback to local data
 */
export const getRandomWord = async (): Promise<Word> => {
  try {
    // Get a random word from our common words list
    const randomWord = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    
    // Fetch the word data from the API
    const response = await fetch(`${API_ENDPOINT}${randomWord}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from API');
    }
    
    const data = await response.json();
    
    // Process the API response
    if (data && data.length > 0) {
      const wordData = data[0];
      const meanings = wordData.meanings && wordData.meanings.length > 0 ? wordData.meanings[0] : null;
      
      if (!meanings) {
        throw new Error('No meanings found');
      }
      
      const definition = meanings.definitions && meanings.definitions.length > 0 
        ? meanings.definitions[0].definition 
        : 'No definition available';
        
      const example = meanings.definitions && meanings.definitions.length > 0 
        ? meanings.definitions[0].example 
        : null;
      
      return {
        id: generateUniqueId(),
        word: wordData.word,
        definition: definition,
        example: example,
        partOfSpeech: meanings.partOfSpeech,
        phonetic: wordData.phonetic || null,
        date: new Date().toISOString()
      };
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error('Error fetching word:', error);
    
    // Return a random fallback word if API fails
    return {
      ...FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)],
      date: new Date().toISOString(),
      id: generateUniqueId()
    };
  }
};
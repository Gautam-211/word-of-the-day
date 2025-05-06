export interface Word {
  id: string;
  word: string;
  definition: string;
  example: string | null;
  partOfSpeech: string | null;
  phonetic: string | null;
  date: string;
}
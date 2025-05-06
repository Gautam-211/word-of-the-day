import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Word } from '@/types/word';
import { formatDate } from '@/utils/dateUtils';

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.word}>{word.word}</Text>
        <Text style={styles.phonetic}>{word.phonetic || ''}</Text>
      </View>
      
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{formatDate(word.date)}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Definition</Text>
        <Text style={styles.definition}>{word.definition}</Text>
      </View>
      
      {word.example && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Example</Text>
          <Text style={styles.example}>"{word.example}"</Text>
        </View>
      )}
      
      {word.partOfSpeech && (
        <View style={styles.partOfSpeechContainer}>
          <Text style={styles.partOfSpeech}>{word.partOfSpeech}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  word: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1F2937',
    marginBottom: 4,
  },
  phonetic: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  dateBadge: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  definition: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#374151',
    lineHeight: 26,
  },
  example: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  partOfSpeechContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE9FE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginTop: 8,
  },
  partOfSpeech: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8B5CF6',
  },
});

export default WordCard;
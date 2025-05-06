import React, { useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Word } from '@/types/word';
import { formatDate } from '@/utils/dateUtils';

interface HistoryItemProps {
  word: Word;
}

const { width } = Dimensions.get('window');

const HistoryItem: React.FC<HistoryItemProps> = ({ word }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={styles.content}>
          <View style={styles.wordContainer}>
            <Text style={styles.word}>{word.word}</Text>
            {word.partOfSpeech && (
              <View style={styles.partOfSpeechBadge}>
                <Text style={styles.partOfSpeechText}>{word.partOfSpeech}</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.definition} numberOfLines={2}>
            {word.definition}
          </Text>
          
          <View style={styles.footer}>
            <Text style={styles.date}>{formatDate(word.date)}</Text>
          </View>
        </View>
        
        <View style={styles.iconContainer}>
          <ChevronRight size={18} color="#9CA3AF" />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  word: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1F2937',
    marginRight: 8,
  },
  partOfSpeechBadge: {
    backgroundColor: '#EDE9FE',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  partOfSpeechText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8B5CF6',
  },
  definition: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  iconContainer: {
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default HistoryItem;
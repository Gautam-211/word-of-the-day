import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trash2 } from 'lucide-react-native';
import { getWordHistory, clearWordHistory } from '@/services/storageService';
import HistoryItem from '@/components/HistoryItem';
import { Word } from '@/types/word';
import { EmptyState } from '@/components/EmptyState';

export default function HistoryScreen() {
  const [history, setHistory] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const words = await getWordHistory();
      setHistory(words);
    } catch (err) {
      setError('Failed to load history.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all word history? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: handleClearHistory 
        }
      ]
    );
  };

  const handleClearHistory = async () => {
    try {
      await clearWordHistory();
      setHistory([]);
    } catch (err) {
      setError('Failed to clear history.');
      console.error(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={loadHistory}
            >
              <Text style={styles.retryButtonText}>Fetch Latest History</Text>
            </TouchableOpacity>
        </View>
      <View style={styles.header}>
        <Text style={[styles.title, { textAlign: 'center' }]}>Word History</Text>
        <Text style={styles.subtitle}>Your vocabulary journey</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text style={styles.loadingText}>Loading your word history...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={loadHistory}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : history.length === 0 ? (
        <EmptyState 
          title="No History Yet" 
          message="Words you view will appear here. Start by exploring new words on the Today tab!"
        />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryItem word={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

        {history.length > 0 && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={confirmClearHistory}
            >
              <Trash2 size={20} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newContainer: {
    position: 'fixed',
    textAlign: 'center',
    flex: 1,
    justifyContent: 'center',  // centers vertically (if needed)
    alignItems: 'center',      // centers horizontally
    padding: 20,
    backgroundColor: '#F8F9FA', // optional light background
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    paddingTop: 24,
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
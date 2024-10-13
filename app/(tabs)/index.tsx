import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DataTable } from '@/components/DataTable';

export default function HomeScreen() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    // Fetch API call
    fetch('https://fetch-hiring.s3.amazonaws.com/hiring.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
        setRefreshing(false);  // Stop the refresh animation
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        setRefreshing(false);  // Stop the refresh animation
      });
  };

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Pull-to-refresh handler
  const onRefresh = () => {
    setRefreshing(true); // Start the refresh animation
    fetchData();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/app_background.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Fetch Coding Assessment</ThemedText>
      </ThemedView>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ThemedView style={styles.stepContainer}>
          {loading ? <ThemedText>Loading...</ThemedText> : <DataTable data={data} />}
        </ThemedView>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: '100%',
    position: 'absolute',
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
});

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function AboutAssignmentScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/assignment_background.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedText type="title">Fetch Rewards Coding Exercise</ThemedText>
      
      <ThemedText>
        This is a Software Engineering - Mobile exercise where you are required to build a native Android app in Kotlin or Java that retrieves data from the provided URL and displays it to the user.
      </ThemedText>

      <Collapsible title="Requirements">
        <ThemedText>
          - Retrieve data from: https://fetch-hiring.s3.amazonaws.com/hiring.json.
        </ThemedText>
        <ThemedText>
          - Group the items by "listId".
        </ThemedText>
        <ThemedText>
          - Sort the items first by "listId", then by "name".
        </ThemedText>
        <ThemedText>
          - Filter out any items with blank or null "name" values.
        </ThemedText>
        <ThemedText>
          - Display the final result in an easy-to-read list.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Submission Instructions">
        <ThemedText>
          - Submit your solution by providing a link to a public repository, such as GitHub or BitBucket.
        </ThemedText>
        <ThemedText>
          - Ensure the project builds on the latest tools and supports the current mobile OS.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Evaluation Criteria">
        <ThemedText>
          - The app must provide the expected results.
        </ThemedText>
        <ThemedText>
          - Necessary documentation should be included in the repository.
        </ThemedText>
        <ThemedText>
          - The solution doesn't need to be production-ready, but it should showcase your best work.
        </ThemedText>
      </Collapsible>

      <Collapsible title="FAQ">
        <ThemedText>
          For any unspecified requirements, use your best judgment.
        </ThemedText>
        <ThemedText>
          If you’re uncomfortable with a public repository, coordinate with your recruiter to provide private access.
        </ThemedText>
        <ThemedText>
          There is no set time limit, but the exercise is designed to be completed in a few hours. Feel free to take as much time as needed.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  reactLogo: {
    height: 250,
    width: '100%',
    position: 'absolute',
  },
});

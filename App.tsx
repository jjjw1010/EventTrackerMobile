import React from 'react';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {useState, useEffect} from 'react';

type HeaderProps = PropsWithChildren<{
  title: string;
}>;

function Header({title}: HeaderProps): React.JSX.Element {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

type SectionProps = PropsWithChildren<{
  time: number;
}>;

function App(): React.JSX.Element {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header title="CountDown">{}</Header>
        <View style={styles.itemContainer}>
          <Text>{formattedTime}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text>{formattedTime}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text>{formattedTime}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text>{formattedTime}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    display: 'flex',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  headerTitle: {
    fontWeight: '900',
    fontSize: 30,
    color: 'white',
    fontFamily: 'Arial',
  },
  itemContainer: {
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default App;

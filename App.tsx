import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
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

type ItemProps = PropsWithChildren<{
  // heading: string;
  index: number;
  time: string;
  timeStart: () => void;
}>;
function Item({index, time, timeStart}: ItemProps): React.JSX.Element {
  const [text, setText] = useState('Event ' + (index + 1));
  return (
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.itemHeader}
        placeholder="Event Name"
        onChangeText={newText => setText(newText)}
        defaultValue={text}></TextInput>
      <Text style={styles.itemTime}>{time}</Text>
      <View style={styles.itemChange}>
        <Icon name="settings" size={20} color="orange" onPress={timeStart} />
      </View>
    </View>
  );
}
function formatMillisecondsToHMS(currentTime: Date, startTime: Date): string {
  const milliseconds = currentTime.getTime() - startTime.getTime();
  const totalSeconds = Math.floor(milliseconds / 1000);

  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);

  const formattedHours = hours > 0 ? `${hours}h` : '00h';
  const formattedMinutes =
    minutes > 0 ? (minutes < 10 ? `0${minutes}m` : `${minutes}m`) : '00m';
  const formattedSeconds =
    seconds > 0 ? (seconds < 10 ? `0${seconds}s` : `${seconds}s`) : '00s';

  return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`;
}

function App(): React.JSX.Element {
  const [numberItems, setNumberItems] = useState(1);
  const [currentTimes, setCurrentTimes] = useState<Array<Date>>(
    Array(numberItems).fill(new Date()),
  );
  const [startTimes, setStartTimes] = useState<Array<Date>>(
    Array(numberItems).fill(new Date()),
  );
  const [formattedArray, setFormattedArray] = useState<Array<string>>(
    currentTimes.map((currentTime, index) =>
      formatMillisecondsToHMS(currentTime, startTimes[index]),
    ),
  );
  console.log(formattedArray);

  // Handles Reset in Start Time
  function handleItem(i: number) {
    const newStartTimes = [...startTimes];
    newStartTimes[i] = new Date();
    setStartTimes(newStartTimes);
  }

  function handleNumItems(op: string) {
    if (op === 'add') {
      if (numberItems === 10) {
        return;
      } else {
        setNumberItems(numberItems + 1);
        setCurrentTimes([...currentTimes, new Date()]);
        setStartTimes([...startTimes, new Date()]);
        setFormattedArray(
          currentTimes.map((currentTime, index) =>
            formatMillisecondsToHMS(currentTime, startTimes[index]),
          ),
        );
      }
    }
    if (op === 'sub') {
      if (numberItems === 0) {
        return;
      } else {
        setNumberItems(numberItems - 1);
        setCurrentTimes(prevCurrentTimes => prevCurrentTimes.slice(0, -1));
        setStartTimes(prevStartTimes => prevStartTimes.slice(0, -1));
        setFormattedArray(
          currentTimes
            .slice(0, -1)
            .map((currentTime, index) =>
              formatMillisecondsToHMS(currentTime, startTimes[index]),
            ),
        );
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimes(prevCurrentTimes =>
        prevCurrentTimes.map(() => new Date()),
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentTimes, startTimes]);
  useEffect(() => {
    const newFormattedArray = currentTimes.map((currentTime, index) =>
      formatMillisecondsToHMS(currentTime, startTimes[index]),
    );
    setFormattedArray(newFormattedArray);
  }, [currentTimes, startTimes]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header title="Event Tracker"></Header>
        {formattedArray.map((formattedTime, index) => (
          <Item
            key={index}
            index={index}
            time={formattedTime}
            timeStart={() => handleItem(index)}></Item>
        ))}
        <View>
          <Text
            style={{fontSize: 20, padding: 10, borderWidth: 1, flex: 1}}
            onPress={() => handleNumItems('add')}>
            {'+'}
          </Text>
          <Text
            style={{fontSize: 20, padding: 10, borderWidth: 1}}
            onPress={() => handleNumItems('sub')}>
            {'-'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#59a7ff',
  },
  headerContainer: {
    height: 100,
    display: 'flex',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#217DBB',
  },
  headerTitle: {
    fontWeight: '900',
    fontSize: 30,
    color: 'white',
    fontFamily: 'Arial',
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    // height: 100,
    borderRadius: 5,
    justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 10,
    marginVertical: 7,
    padding: 10,
  },
  itemHeader: {
    fontSize: 20,
    fontWeight: '500',
    display: 'flex',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    textAlign: 'left',
  },
  itemTime: {
    fontSize: 20,
    fontWeight: '300',
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
  },
  itemChange: {
    alignItems: 'flex-end',
  },
});

export default App;

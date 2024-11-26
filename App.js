import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ToDoList from './components/ToDoList/ToDoList';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ToDoList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#165a6b',
  },
});

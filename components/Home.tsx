import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/context';

const Home = () => {
  const data: any = useAuth();
  console.log(data);
  const [task, setTask] = useState<any>('');

  // FIRST APP START RUN
  useEffect(() => {
    data.getData();
  }, []);

  // ADD TASK
  const addTask = async () => {
    try {
      if (task.length === 0) {
        Alert.alert('Error', 'Field is empty', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        return;
      }
      await AsyncStorage.setItem(
        'data',
        JSON.stringify([...data.tasks, {task, key: data.tasks.length.toString()}]),
      );
      await data.getData();
      Alert.alert('Todo Add', 'Your to-do list has been added.');
      setTask('');
    } catch (error) {
      console.log(error);
    }
  };

  // REMOVE TASK
  const removeTask = async (key: any) => {
    Alert.alert('Todo Delete', 'Are You Sure?', [
      {
        text: 'Cancel',
        onPress: () => {
          Alert.alert('Todo Delete', 'Your to-do list is safe.');
        },
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          Alert.alert('Todo Delete', 'Your to-do list has been removed.');
          const prod: any = data.tasks.filter((item: any) => item.key !== key);
          data.setTasks(prod);
          await AsyncStorage.setItem('data', JSON.stringify(prod));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={task}
        onChangeText={setTask}
        placeholder="Add a task"
      />
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {data.tasks.length !== 0 ? (
        <View>
          <Text style={styles.totalResult}>
            <Text style={styles.strong}>Total Todo: </Text>
            {data.tasks.length}
          </Text>
          <FlatList
            style={styles.list}
            data={data.tasks}
            renderItem={({item}) => (
              <View style={styles.listItem} key={item.key}>
                <Text>{item.task}</Text>
                <TouchableOpacity onPress={() => removeTask(item.key)}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item: any) => item.key}
          />
        </View>
      ) : (
        <Text style={styles.todoEmpty}>Place Todo</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffff',
  },
  input: {
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: '#E91E63',
    backgroundColor: 'rgba(233,30,99, .2)',
    borderRadius: 2,
    padding: 4,
    color: '#E91E63',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#E91E63',
    borderWidth: 0.2,
    borderStyle: 'solid',
    borderColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 1.5,
    borderRadius: 2,
    transition: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  todoEmpty: {
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
  totalResult: {
    marginTop: 15,
  },
  strong: {
    fontWeight: 'bold',
  },
});

export default Home;

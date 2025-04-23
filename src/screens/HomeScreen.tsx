import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types/Task';
import TaskItem from '../components/TaskItem';

const HomeScreen = () => {
  const { tasks, addTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a task title.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: 0
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Input and Add button row */}
      <View style={styles.inputRow}>
        <View style={styles.inputFields}>
          <TextInput
            style={styles.input}
            placeholder="Title..."
            placeholderTextColor="#FF8303"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="About..."
            placeholderTextColor="#FF8303"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
  <Image
    source={require('../images/add.png')}
    style={styles.addIcon}
    resizeMode="contain"
  />
</TouchableOpacity>

      </View>

      {/* Task list or No tasks message */}
      {tasks.length === 0 ? (
  <View style={styles.emptyContainer}>
    <Image
      source={require('../images/notask.png')}
      style={styles.emptyImage}
      resizeMode="contain"
    />
  </View>
) : (
  <FlatList
    data={tasks}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <TaskItem task={item} />}
    contentContainerStyle={{ paddingBottom: 100 }}
  />
)}

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A17',
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  inputFields: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 8,
    padding: 10,
    color: '#F0E3CA',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#FF8303',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#1B1A17',
    fontSize: 24,
    fontWeight: 'bold',
  },
  addIcon: {
    width: 24,
    height: 24,
    tintColor: '#1B1A17', // Optional for coloring icons
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyImage: {
    width: 200,
    height: 200,
    opacity: 0.6,
  },
  
  noTasksText: {
    color: '#F0E3CA',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;

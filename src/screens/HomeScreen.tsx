import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types/Task';
import { TaskCard } from '../components/TaskCard';
import { AddTaskModal } from '../components/AddTaskModal';

export const HomeScreen = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (id: string) => {
    Alert.alert('Delete this task?', 'Are you sure?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => deleteTask(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>To Do List</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard task={item} onDelete={() => handleDelete(item.id)} />
          )}
        />
      )}

      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1B1A17', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { color: '#F0E3CA', fontSize: 24 },
  addButton: {
    backgroundColor: '#FF8303',
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: { fontSize: 24, color: '#1B1A17' },
  noTasks: { color: '#F0E3CA', textAlign: 'center', marginTop: 50, fontSize: 16 },
});

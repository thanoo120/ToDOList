import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../store/useTaskStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../theme';
import { create } from 'zustand';

export type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ),
  })),
}));

type Props = {
  task: Task;
};

const TaskItem: React.FC<Props> = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleTask(task.id)} style={styles.textContainer}>
        <Text style={[styles.text, task.completed && styles.completed]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(task.id)}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    padding: 16,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: COLORS.textLight,
    fontSize: 16,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: COLORS.textDim,
  },
  
});

export default TaskItem;

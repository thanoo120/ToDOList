import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/Task';
import { useTaskStore } from '../store/useTaskStore';

interface Props {
  task: Task;
  onDelete: () => void;
}

export const TaskCard = ({ task, onDelete }: Props) => {
  const toggleComplete = useTaskStore((state) => state.toggleComplete);

  return (
    <View style={styles.card}>
      <View style={styles.textBox}>
        <Text style={[styles.title, task.completed && styles.completed]}>{task.title}</Text>
        <Text style={[styles.desc, task.completed && styles.completed]}>{task.description}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleComplete(task.id)}>
          <Text style={styles.actionBtn}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={[styles.actionBtn, { color: '#FF8303' }]}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1E1B',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBox: { flex: 1 },
  title: { fontSize: 18, color: '#F0E3CA', fontWeight: 'bold' },
  desc: { fontSize: 14, color: '#F0E3CA' },
  completed: { textDecorationLine: 'line-through', opacity: 0.5 },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { fontSize: 20, color: '#A35709' },
});

import React, { useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTaskStore } from '../store/useTaskStore';
import { Task } from '../types/Task';
import uuid from 'react-native-uuid';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AddTaskModal = ({ visible, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const addTask = useTaskStore((state) => state.addTask);

  const handleAdd = () => {
    const task: Task = {
      id: uuid.v4().toString(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    addTask(task);
    setTitle('');
    setDesc('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalBox}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            placeholderTextColor="#F0E3CA"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Description"
            style={[styles.input, { height: 80 }]}
            placeholderTextColor="#F0E3CA"
            value={description}
            onChangeText={setDesc}
            multiline
          />
          <View style={styles.buttons}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={styles.saveBtn}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#1F1E1B',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderColor: '#FF8303',
    borderWidth: 1,
    color: '#F0E3CA',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    padding: 10,
    backgroundColor: '#A35709',
    borderRadius: 6,
  },
  saveBtn: {
    padding: 10,
    backgroundColor: '#FF8303',
    borderRadius: 6,
  },
  btnText: {
    color: '#1B1A17',
    fontWeight: 'bold',
  },
});
